using System;
using Application.Core;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetProfile
{
    public class Query : IRequest<Result<Userprofile>>
    {
        public required string UserId { get; set; }
    }
    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Query, Result<Userprofile>>
    {
        public async Task<Result<Userprofile>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = await context.Users.ProjectTo<Userprofile>(mapper.ConfigurationProvider)
            .SingleOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

            return profile == null ? Result<Userprofile>.Failure("profile not found", 400) : Result<Userprofile>.Succcess(profile);
        }
    }
}
