using System.Net;

namespace Backend.Exceptions;

public class NotFoundException : HttpResponseException
{
    public NotFoundException(string message)
        : base(HttpStatusCode.NotFound, message) {}
}