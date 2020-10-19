using System;
using System.Collections.Generic;
using System.IO;
using System.IO.Compression;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;

namespace iTSoft.CRM.Web.Controllers
{
    public class BaseController : ApiController
    {
        public HttpResponseMessage GetByteResponse(string filePath, string fileName)
        {
            var result = new HttpResponseMessage(HttpStatusCode.OK);
            try
            {
                byte[] byteArray = File.ReadAllBytes(filePath);
                result.Content = new ByteArrayContent(byteArray);
                result.Content.Headers.ContentDisposition =
                    new System.Net.Http.Headers.ContentDispositionHeaderValue("attachment")
                    {
                        FileName = fileName
                    };
                result.Content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream");
            }
            catch (Exception ex)
            {

            }
            return result;
        }

        public string FormatReportFromDate(DateTime fromDate)
        {
            return fromDate.Date.ToString("yyyy-MM-dd");
        }

        public string FormatReportToDate(DateTime toDate)
        {
            return toDate.Date.AddDays(1).AddSeconds(-1).ToString("yyyy-MM-dd HH:mm");
        }
    }
}
