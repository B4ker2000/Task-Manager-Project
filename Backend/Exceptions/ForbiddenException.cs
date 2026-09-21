using System.Net;

namespace Backend.Exceptions;

public class ForbiddenException : HttpResponseException
{
    public ForbiddenException(string message = "You do not have permission to perform this action.")
        : base(HttpStatusCode.Forbidden, message) { }
}