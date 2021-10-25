using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using System.Xml.Serialization;

namespace iTSoft.Communication.Service.Helpers
{
    public class XMLHelper
    {
        public string Deserialize<T>(T TEntity)
        {
            try
            {
                var stringwriter = new System.IO.StringWriter();
                var serializer = new XmlSerializer(TEntity.GetType());
                serializer.Serialize(stringwriter, TEntity);
                return stringwriter.ToString();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public bool IsValidXml(string xmlStr, string xsdFilePath)
        {
            var xdoc = XDocument.Load(new StringReader(xmlStr));
            var schemas = new XmlSchemaSet();
            schemas.Add(null, xsdFilePath);
            try
            {
                xdoc.Validate(schemas, null);
            }
            catch (XmlSchemaValidationException)
            {
                return false;
            }
            return true;
        }
    }
}
