using System;
using Xunit;

namespace Acme.BookStore.EntityFrameworkCore.Applications.Books;

[Collection(BookStoreTestConsts.CollectionDefinitionName)]
public class EfCoreBookAppService_Tests : BookAppService_Tests<BookStoreEntityFrameworkCoreTestModule>
{

}
