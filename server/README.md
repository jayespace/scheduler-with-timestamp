# Scheduler with timestamp
It is available to access service : [Schedule Manager](http://35.230.6.124)

<br>

## Server Feature
<p>
  <img src="https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=black"/>
  <img src="https://img.shields.io/badge/Gin-13448F?style=for-the-badge&logo=&logoColor=black"/>
  <img src="https://img.shields.io/badge/gorm-26689A?style=for-the-badge&logo=&logoColor=white"/>
  <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
</p>

- Gin을 사용하여 web application과 API 기능을 제작 하였습니다.
  - Schedule API - 모든 CRUD 기능 
  - User API - 현재 Sign Up, Log In, Log Out 기능
- GORM과 elephantSQL의 postgreSQL로 DB를 설정하였습니다.
- bcrypt를 사용하여 유저의 비밀번호를 노출시키지 않고 저장하는 기능이 있습니다.
- JWT 토큰을 HttpOnly cookie로 설정하여 Auth check을 할 수 있습니다.

<br>

## Deployment
<p>
   <img src="https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
</p>

* golang은 binary로 compile이 가능하고 dockerfile의 가장 작은 단위인 scratch로 만들 수 있었습니다.   
* LocalTimeZone은 Asia/Seoul 기준으로 설정되어 있습니다.

