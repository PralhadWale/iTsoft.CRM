using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

namespace iTSoft.CRM.Core.Cryptography
{
    public class PasswordManager
    {
        private static readonly byte[] _salt = Encoding.UTF8.GetBytes(@"+P-43v4aDHMc^");//Random

        #region Encryption

        //Encrypt a string into a string using a password uses Encrypt(byte[], byte[], byte[])
        public static string Encrypt(string clearText, string password)
        {
            // First we need to turn the input string into a byte array.
            byte[] clearBytes = 
                Encoding.Unicode.GetBytes(clearText);

            // Then, we need to turn the password into Key and IV
            // We are using salt to make it harder to guess our key
            // using a dictionary attack - 
            // trying to guess a password enumerating all posssible words.
            PasswordDeriveBytes pdb = new PasswordDeriveBytes(password, _salt);

            // Now get the key/IV and do the encryption  using the
            // function that accepts byte arrays.
            //
            byte[] encryptedData = Encrypt(clearBytes,
                pdb.GetBytes(32), pdb.GetBytes(16));

            // Now we need to turn the resulting byte array into a string.
            return Convert.ToBase64String(encryptedData);
        }

        public static byte[] Encrypt(byte[] clearData, byte[] Key, byte[] IV)
        {
            // Create a MemoryStream to accept the encrypted bytes
            MemoryStream ms = new MemoryStream();

            // Create a symmetric alogorith.
            // We are going to use Rijindael beacuse it is strong and 
            // available on all platforms.
            Rijndael alg = Rijndael.Create();

            // Now set the Key and the IV.
            alg.Key = Key;
            alg.IV = IV;

            // Create a CryptoStream through which we are going to be 
            // pumping our data.
            CryptoStream cs = new CryptoStream(ms, alg.CreateEncryptor(), CryptoStreamMode.Write);

            // Write the data and make it do the encryption
            cs.Write(clearData, 0, clearData.Length);

            // Close the data crypto stream (or do FlushFinalBlock).
            cs.Close();


            // Now get the encrypted data from the MemoryStream.
            byte[] encryptedData = ms.ToArray();

            return encryptedData;
        }


        #endregion

        #region

        // Decrypt a byte array into a byte array using a key and a IV
        public static byte[] Decrypt(byte[] cipherData, byte[] Key, byte[] IV)
        {
            // Create a MemoryStream that is going to accept the
            // decrypted bytes
            MemoryStream ms = new MemoryStream();

            // Create a symmetric algorithm.
            // We are going to use Rijndael beacuse it is strong and 
            // available on all platforms
            Rijndael alg = Rijndael.Create();

            // Now set the Key and the IV.
            alg.Key = Key;
            alg.IV = IV;

            // Create a CryptoStream through which we are going to be 
            // pumping our data.
            CryptoStream cs = new CryptoStream(ms, alg.CreateDecryptor(), CryptoStreamMode.Write);

            // Write the data and make it do the encryption
            cs.Write(cipherData, 0, cipherData.Length);

            // Close the data crypto stream (or do FlushFinalBlock).
            cs.Close();

            // Now get the decrypted data from the MemoryStream.
            byte[] decryptedData = ms.ToArray();

            return decryptedData;
        }

        public static string Decrypt(string cipherText, string password)
        {
            // First we need to turn the input string into a byte array.
            // We presume that Base64. encoding was used
            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            // Then, we need to turn the password into Key and IV
            // We are using salt to make it harder to guess our key
            // using a dictionary attack - 
            // trying to guess a password enumerating all posssible words.
            PasswordDeriveBytes pdb = new PasswordDeriveBytes(password, _salt);

            // Now get the key/IV and do the encryption  using the
            // function that accepts byte arrays.
            //
            byte[] decryptedData = Decrypt(cipherBytes,
                pdb.GetBytes(32), pdb.GetBytes(16));

            // Now we need to turn the resulting byte array into a string.
            return System.Text.Encoding.Unicode.GetString(decryptedData);
        }
        #endregion
  
    }
}
