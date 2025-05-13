<%@ page language="java" contentType="text/html; charset=utf-8"
    pageEncoding="utf-8"%>
<%@ page import="java.sql.*" %>
<%
	request.setCharacterEncoding("utf-8");

	String uid = request.getParameter("id");
	String upass = request.getParameter("password");
	//String uid = (String) session.getAttribute("id");
	//String upass = (String) session.getAttribute("password");

	
	String sql = "SELECT * FROM user WHERE (userid = '";
	sql += uid + "') and (userpw = '"  + upass + "')"; 
	
	Class.forName("com.mysql.jdbc.Driver");
	Connection conn = DriverManager.getConnection(
			"jdbc:mysql://localhost:3306/userdata", "root", "0000");
	Statement stmt = conn.createStatement();
	PreparedStatement pstmt = conn.prepareStatement(sql.toString());
	
	ResultSet result = pstmt.executeQuery();
	if (result.next()) {
		session.setAttribute("userId", uid);
		//out.print("로그인 완료!");
%>
	
		<script>
			sessionStorage.setItem("userId", "<%= uid %>");
			location.href="testhtml.html";
			alert("환영합니다.");
		</script>
<%
	}
	else {
		//out.print("로그인 실패");
%>
		<script>
			window.history.back();
			alert("로그인 실패");
		</script>
<%
	}
	stmt.close(); conn.close();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>login.jsp</title>
</head>
<body>

</body>
</html>