using System;
using System.Diagnostics;
using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }
    public class Handler(AppDbContext context) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
            .FindAsync([request.Id], cancellationToken);
            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);
            //    ?? throw new Exception("Cannot find activity");

            context.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<Unit>.Failure("failed to delete the activity", 400);
            return Result<Unit>.Succcess(Unit.Value);
        }
    }
}
