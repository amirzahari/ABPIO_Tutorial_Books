﻿using System;
using Volo.Abp.Application.Dtos;

namespace Acme.BookStore;

public class AuthorLookupDto : EntityDto<Guid>
{
    public string? Name { get; set; }
}
