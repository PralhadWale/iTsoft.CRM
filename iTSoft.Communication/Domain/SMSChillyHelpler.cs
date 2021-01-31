using System.Net;
using System.IO;
using iTSoft.Communication.Models;

namespace iTSoft.Communication.Service.Helpers
{
    public class SMSChillyHelpler
    {
        public bool SMSChillySendMessage(string MessageContent, string MobileNo, SMSChillySettings gatewaySettings)
        {
            if(gatewaySettings == null)
            {
                gatewaySettings = new SMSChillySettings();
            }
            gatewaySettings.URL = "http://smschilly.in/sms_api/sendsms.php";
            gatewaySettings.UserName = "DRVPMC";
            gatewaySettings.Password = "admin";
            gatewaySettings.SenderName = "NSKCON";

            bool objRet = true;
            try
            {
                var requestUrl = gatewaySettings.URL + "?username=" + gatewaySettings.UserName + "&password=" + gatewaySettings.Password + "&mobile=" + MobileNo + "&message=" + MessageContent + "&sendername=" + gatewaySettings.SenderName + "&routetype=1";
                HttpWebRequest http = (HttpWebRequest)HttpWebRequest.Create(requestUrl);
                HttpWebResponse response = (HttpWebResponse)http.GetResponse();
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    string responseJson = sr.ReadToEnd();
                }
            }
            catch
            { objRet = false; }
            return objRet;
        }
    }
}