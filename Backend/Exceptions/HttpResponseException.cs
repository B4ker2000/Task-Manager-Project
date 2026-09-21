using System.Net;

namespace Backend.Exceptions;

public class HttpResponseException : Exception
{
    public HttpStatusCode StatusCode { get; }

    public HttpResponseException(HttpStatusCode statusCode, string message) : base(message)
    {
        StatusCode = statusCode;
    }
}