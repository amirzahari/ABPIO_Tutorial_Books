﻿using System;
using Volo.Abp.Domain.Entities.Auditing;

namespace Acme.BookStore;

public class Book : AuditedAggregateRoot<Guid>
{
    public required string Name { get; set; }
    public BookType Type { get; set; }
    public DateTime PublishDate { get; set; }
    public float Price { get; set; }
    public Guid AuthorId { get; set; }

    public required Author Author { get; set; }
}
