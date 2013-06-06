<!--#include file="connect.asp"-->
<!--#include file="JSON.asp"-->
<!--#include file="JSON_UTIL.asp"-->

<%
lcSQLString = "SELECT CVE_ART AS CLV_ART, DESCR, PESO FROM INVE01 WHERE (STATUS = 'A') ORDER BY CLV_ART"


QueryToJSON(dbConn, lcSQLString).Flush

%>
<!--#include file="disconnect.asp"-->
