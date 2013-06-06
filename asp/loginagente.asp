<!--#include file="connect.asp"-->
<%
 strpassword = request("psw") ' Debe estar en MD5
 strusuario = request("id")

lcSQLString = "SELECT CVE_VEND, CLASIFIC, SUBSTRING(sys.fn_sqlvarbasetostr(HASHBYTES('MD5', CLASIFIC)), 3, 32) AS PASSW WHERE PASSW ='"&strpassword&"' AND CVE_VEND like '%"&strusuario&"%'"

rs.Open lcSQLString,dbConn

if not rs.eof then
  if rs("CVE_VEND")=strusuario and rs("PASSW")= strpassword then
      session("autorizacion")= 1
      response.write "acceso valido"
  end if
else
  session("autorizacion")=-1
   response.write "no acceso valido"
end if


%>
<!--#include file="disconnect.asp"-->
