---
layout: post
title:  "[지킬 블로그] Disqus 댓글 기능 달기"
category: [jekyll]
tags:
  - Jekyll
comments: true
---

### 지킬 블로그 댓글 기능 달기
Disqus는 정적인 Jekyll에서 동적 기능인 댓글을 사용할 수 있게 한다.

### Step1) Disqus 가입하기
[Disqus](https://disqus.com/) 에서 회원가입 하고, 이메일로 verify를 한다.

### Step2) 사이트 등록하기
- 오른편 톱니바퀴 모양 아이콘을 클릭하고, 드롭다운 메뉴의 `Add Disqus To Site` 페이지에서 `GET STARTED`를 클릭한다.

- 2번 째 항목인 `I want to install Disqus on my site`를 클릭한다.

- 웹사이트 이름과 카테고리를 임의로 지정해주고, 웹사이트 URL은 댓글 기능을 붙일 내 블로그 주소를 기입한다.

### Step3) Installation과 Jekyll에 적용
- Jekyll 항목을 선택하고, 아래와 같은 Universal Code를 얻는다.

- `_includes` 디렉토리에 comments.html 을 생성하고 얻은 코드를
{% raw %}`{% if page.comments %}` 와 `{% endif %}` 사이에 붙여넣는다.{% endraw %}

```python
{% raw %}
{% if page.comments %}
  <div id="disqus_thread"></div>
  <script>

  /**
  *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
  *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
  /*
  var disqus_config = function () {
  this.page.url = PAGE_URL;  // Replace PAGE_URL with your page's canonical URL variable
  this.page.identifier = PAGE_IDENTIFIER; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
  };
  */
  (function() { // DON'T EDIT BELOW THIS LINE
  var d = document, s = d.createElement('script');
  s.src =

  ...

{% endif %}
{% endraw %}
```

- `_layouts` 디렉토리의 `post.html` 에서 댓글 기능을 붙일 위치에 다음과 같이 include를 한다.

```python
{% raw %}
<div>
  {{ content }}
  {% include comments.html %}
</div>
{% endraw %}
```

### Step4) 포스트에 Disqus 사용하기
Disqus를 사용하려면, YAML frontmatter에 아래와 같이 comments: true를 삽입하면 된다. comments: false나 comments: 자체를 넣지 않으면 Disqus가 나타나지 않는다.

```python
{% raw %}
---
layout: default
comments: true
# other options
---
{% endraw %}
```
