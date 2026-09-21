using System.Net;

namespace Backend.Exceptions;

public class BadRequestException : HttpResponseException
{
    public BadRequestException(string message)
        : base(HttpStatusCode.BadRequest, message) { }
}