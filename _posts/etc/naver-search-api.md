# 네이버 검색 API를 이용하여 책 검색하기

지난 달 `AskDjango 해커톤` 참여를 위해 제작할 아이템에 대해 회의를 했었다. 나는 패스트캠퍼스에서 주최한 해커톤을 참여해본 경험이 있었기 때문에 무박 2일간 할 수 있는 것에 대한 선택의 폭이 좁다는 것을 절감하고 있었다. 시간적인 문제도 있지만 다른 사람과 적절히 일을 분배하여 깃헙을 통해 코드를 공유하는 것은 절대 쉬운 일이 아닌 까닭이다. 협업을 처음 해봤거나 협업 경험이 적으면 더욱이 그럴 것이다. 그렇기 때문에  원래 기획하고 있었던 '중고서점 프로젝트에 몇 가지 기능을 추가하는 것이 어떨지'에 대한 의견을 냈었고, 팀원들이 긍정적으로 검토해줘서 일명 '뿡상의 프로젝트에 기여하기'를 주제로 해커톤을 진행하게 되었다.

책을 사고싶은 사람이 글을 올리고, 마침 책이 파는 리스트에 존재한다면 매칭하여 알람을 준다. 또한 사려는 책이 없었지만 추후에 파는 사람이 글을 올릴 경우, 책을 사는 사람의 글 리스트에 해당 책이 존재하면 매칭하여 알람을 주는 것이 하고 싶었던 기능 중 하나이다. 바로 글을 등록할 때, 책에 대한 정보를 네이버 검색 API를 통해서 호출하는 것이다.

[네이버 책 API Document](https://developers.naver.com/docs/search/book/)

## 1. 준비사항
- **애플리케이션 등록** : 네이버 오픈 API로 개발하기 위해서 'Application-애플리케이션 등록' 메뉴에서 애플리케이션을 등록해야 한다.
- **클라이언트 ID와 Secret 확인** : 등록을 마치면 '내 애플리케이션'에서 Client ID와 Client Secret 값을 확인할 수 있다.

## 2. API 기본 정보
- `JSON 형태`로 출력을 할 것이기 때문에 `GET요청 URL`로 `https://openapi.naver.com/v1/search/book.json`을 쓰고자 한다.

## 3. 요청 변수
- **query** : 검색을 원하는 문자열로서 UTF-8로 인코딩한다.
- **display** : 10(기본값)~100(최대), 검색 결과 출력 건수를 지정한다. 필수 x
- **sort** : 정렬 옵션으로 sim(유사도순)이 기본값이다. 그 외에 date(출간일순), count(판매량순)이 있다. 필수 x

## 4. 예시

### 호출

```
curl "https://openapi.naver.com/v1/search/book.xml?query=%EC%A3%BC%EC%8B%9D&display=10&start=1" \
    -H "X-Naver-Client-Id: {애플리케이션 등록 시 발급받은 client id 값}" \
    -H "X-Naver-Client-Secret: {애플리케이션 등록 시 발급받은 client secret 값}" -v
```

### 파이썬 코드

```python
import urllib.request


client_id = Client ID
client_secret = Client Secret
q = urllib.parse.quote('보노보노')
url = "https://openapi.naver.com/v1/search/book?query=" + q + "&display=2&sort=count" #json 형태로 출력, 검색어는 '보노보노', 출력 결과는 2개, 판매량순으로
req = urllib.request.Request(url)
req.add_header("X-Naver-Client-Id",client_id)
req.add_header("X-Naver-Client-Secret",client_secret)
res = urllib.request.urlopen(req)
rescode = res.getcode()
if(rescode==200):
    response_body = res.read()
    print(response_body.decode('utf-8'))
else:
    print("Error Code:" + rescode)
```

### 결과

```json
{
	"lastBuildDate": "Sat, 09 Sep 2017 00:07:16 +0900",
	"total": 353,
	"start": 1,
	"display": 2,
	"items": [
		{
			"title": "<b>보노보노</b>처럼 살다니 다행이야",
			"link": "http://book.naver.com/bookdb/book_detail.php?bid=11837875",
			"image": "http://bookthumb.phinf.naver.net/cover/118/378/11837875.jpg?type=m1&udate=20170729",
			"author": "김신회",
			"price": "16000",
			"discount": "14400",
			"publisher": "놀",
			"pubdate": "20170406",
			"isbn": "113061185X 9791130611853",
			"description": "『서른은 예쁘다』의 저자 김신회가 발견한&#x0D;<b>보노보노</b> 속 주옥같은 위로의 문장들!&#x0D;&#x0D;[<b>보노보노</b>]를 좋아할 수밖에 없는 이유는 단순한 그림체에 담긴 가슴 따뜻한 대사와 철학적인 메시지 때문이다. <b>보노보노</b>와 친구들은 아주 순수하고 솔직하며 뭉클하다. [<b>보노보노</b>]의 만화책과 애니메이션을 봤던... "
		
		},
		{
			"title": "<b>보노보노</b> 1~5 세트 (전5권,ぼのぼの)",
			"link": "http://book.naver.com/bookdb/book_detail.php?bid=12054292",
			"image": "http://bookthumb.phinf.naver.net/cover/120/542/12054292.jpg?type=m1&udate=20170816",
			"author": "이가라시 미키오",
			"price": "40000",
			"discount": "36000",
			"publisher": "거북이북스",
			"pubdate": "20170522",
			"isbn": "8966071635 9788966071630",
			"description": "<b>보노보노</b>와 친구들이 선사하는 천진한 웃음!1986년, 첫 연재를 시작하자마자 독자들의 폭발적인 지지를 받았던 이가라시 미키오의 대표작 ‘<b>보노보노</b>’. 이 작품의 주인공 <b>보노보노</b>는 생각 많고 질문은 더 많은 아기 해달이다. 여기에 약하지만 귀여운 고집을 지닌 포로리와 걸핏하면 화를 내지만 속정 깊은... "
		
		}
	]
}
```

## 파이썬 코드 살펴보기

### urllib 모듈

```python
import urllib.requests
```

- 웹 서버에 요청하고 응답받기 위해서 일반적으로 브라우저를 사용하는데,
- Python에서 브라우저 없이 http 프로토콜에 따라 서버에 요청 및 응답을 할 수 있도록 도와주는 모듈이 `urllib`이다.
- `request`: 클라이언트의 요청을 처리, `response`: 서버의 응답을 처리, `parse`: url을 분석