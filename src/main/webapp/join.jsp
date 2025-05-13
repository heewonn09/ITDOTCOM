<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.sql.*" %>
<%
	request.setCharacterEncoding("utf-8");

	Connection conn = null;
	Statement stmt = null;
	int count = 0;

	try{
		String uid = request.getParameter("id");
		String upass = request.getParameter("password");
		String uname = request.getParameter("name");
		String utel = request.getParameter("tel");
		
		String sql = "INSERT INTO user(userid, userpw, username, usertel) VALUES";
		sql += "('" + uid + "', '" + upass + "', '" + uname + "', '" + utel + "')";
		
		Class.forName("com.mysql.jdbc.Driver");
		conn = DriverManager.getConnection(
				"jdbc:mysql://localhost:3306/userdata", "root", "0000");
		stmt = conn.createStatement();
		
		count = stmt.executeUpdate(sql);
		if (count == 1) {
			//out.print("회원가입 완료!");
%>
			<script>
				location.href="./testhtml.html";
				alert("가입을 환영합니다");
			</script>
<%
		}
		//else {
		//	out.print("회원가입 중 오류");
		//}
	} catch (Exception e) {
%>
		<script>
			alert("중복되는 아이디");
			window.history.back();
		</script>
<%
	}
	finally {
	stmt.close();	
	conn.close();
	}
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>join.jsp</title>
</head>
<body>

</body>
</html>