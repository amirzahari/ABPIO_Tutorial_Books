using System;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore;

public class GetAuthorListDto : PagedAndSortedResultRequestDto
{
    public string? Filter { get; set; }
}
