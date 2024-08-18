using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;
using System.Linq.Expressions;


namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]


public class NotesController:ControllerBase
{
    private readonly NoteDbContext _context;

    public NotesController(NoteDbContext context)
    {
        _context = context;
    }
    [HttpPost]
    public async Task<IActionResult> CreateNotes([FromBody] CreateNoteRequest noteRequest,CancellationToken ct)
    {
        var note = new Note(noteRequest.Title, noteRequest.Description);

        await _context.Notes.AddAsync(note,ct);
        await _context.SaveChangesAsync(ct);

        return Ok(note);
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request,CancellationToken ct)
    {
        var notesQuery =_context.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search)|| n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id,
        };
        if (request.SortOrder == "desc")
        {
            notesQuery = notesQuery.OrderByDescending(selectorKey);
        }
        else
        {
            notesQuery = notesQuery.OrderBy(selectorKey);
        }

        var noteDtos = await notesQuery.Select(n=>new NoteDto(n.Id, n.Title,n.Description,n.CreatedAt)).ToListAsync(ct);   

        return Ok(new GetNotesResponse(noteDtos));

    }

    [HttpDelete("{id:guid}")]

    public async Task<IActionResult> Delete([FromRoute] Guid id)
    {
        var note=await _context.Notes.FirstOrDefaultAsync(u=>u.Id==id);

        if(note == null)
        {
            return NotFound();
        }

       _context.Notes.Remove(note);

        await _context.SaveChangesAsync();

        return Ok(note);


    }

    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update([FromRoute] Guid id,[FromBody] UpdateNoteRequest request, CancellationToken ct)
    {
        var note=await _context.Notes.FirstOrDefaultAsync(x=>x.Id==id);

        if(note == null)
        {
            return NotFound();
        }

        note.Title = request.Title;
        note.Description = request.Description;
        note.CreatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return Ok(note);


    }

}
