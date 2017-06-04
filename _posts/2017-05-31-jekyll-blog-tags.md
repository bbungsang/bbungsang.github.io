---
layout: post
title: Jekyll 블로그 태그 기능
category: [jekyll]
tags:
  - Jekyll
  - 블로그
---

- 블로그 root 폴더에 `tags.md`를 넣어준다. 이 `tags.md`는 모든 태그들을 출력해준다.

```python
bbungsang.github.io
├─── _includes
├─── _layouts
├─── _posts
├─── css
├─── [tags.md]
└─── ...
```

### tags.md
```python
---
layout: page
permalink: /tags/
title: Tags
---

<ul class="tag-cloud">
{% for tag in site.tags %}
  <span style="font-size: {{ tag | last | size | times: 100 | divided_by: site.tags.size | plus: 70  }}%">
    <a href="#{{ tag | first | slugize }}">
      {{ tag | first }}
    </a> &nbsp;&nbsp;
  </span>
{% endfor %}
</ul>

<div id="archives">
{% for tag in site.tags %}
  <div class="archive-group">
    {% capture tag_name %}{{ tag | first }}{% endcapture %}
    <h3 id="#{{ tag_name | slugize }}">{{ tag_name }}</h3>
    <a name="{{ tag_name | slugize }}"></a>
    {% for post in site.tags[tag_name] %}
    <article class="archive-item">
      <h4><a href="{{ root_url }}{{ post.url }}">{{post.title}}</a></h4>
    </article>
    {% endfor %}
  </div>
{% endfor %}
</div>
```

### \_includes/tags.html
```python
<img src="/images/tag-256.png" alt="Tags: " class="tag-img"/>
<div class="post-tags">
  {% if post %}
    {% assign tags = post.tags %}
  {% else %}
    {% assign tags = page.tags %}
  {% endif %}
  {% for tag in tags %}
  <a href="/tags/#{{tag|slugize}}">{{tag}}</a>{% unless forloop.last %},{% endunless %}
  {% endfor %}
</div>
<br/>
```
