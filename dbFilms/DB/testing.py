import mysql.connector
  
conn = mysql.connector.connect(
  host = "localhost",
  user = "root",
  password = "",
  database = "movies"
)
 
print(conn)
  
# Disconnecting from the server
conn.close()