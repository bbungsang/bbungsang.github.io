---
layout: post
title:  "[Angular] Angular CLI, 클라이언트 구성하기"
category: [Angular, angular]
tags:
  - JavaScript
  - Angular
comments: true
---

## Angular CLI란?
간단한 명령어를 사용하여 엥귤러 프로젝트를 생성, 실행, 빌드할 수 있으며 다양한 구성 요소를 선택적으로 추가할 수 있는 커맨드 라인 인터페이스이다.


## Angular CLI 설치

```
$ npm install -g @angular/cli
```

> Angular CLI 1.0.0 이전 버전의 경우 패키지명이 `angular-cli`였으나, 그 이후 버전부터 `@angular/cli`로 변경되었다.

설치가 완료되면 `ng` 명령어를 사용할 수 있다. 설치가 성공적으로 완료되었는지 버전을 확인하여 보자.

```
$ ng version

    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.6.3
Node: 8.9.3
OS: darwin x64
Angular:
```

## 프로젝트 생성
`ng new` 명령어를 사용하여 프로젝트를 생성한다.

```
$ ng new <project-name>
```

## 프로젝트 실행
`ng serve` 명령어를 실행하면 Webpack을 사용하여 소스코드와 의존 모듈을 번들링하고 Angular CLI가 내장하고 있는 개발용 서버를 실행한다.

```
$ cd <project-name>
$ ng serve --open
```

## Client 구성하기
클라이언트와 서버를 함께 구축할 것이므로,
개발 편의를 위해 CLI로 생성된 디렉토리 `src`의 이름을 `client`로 변경한다.

```
$ mv src client
```

## 변경될 디렉토리 구조

```
Project/
  client/
    apps/
    assets/
    environments/
    index.html
    main.ts
    [...]
  e2e/
  node_modules/
  server/
    Server.ts
    app.ts
  .angular-cli.json
  [...]
```

- src 디렉토리 기준으로 설정 파일(.angular-cli.json)이 작성되어 있기 때문에 에러가 발생할 것이다.

## .angular-cli.json 설정 변경
ng 명령어를 실행하는 데 있어 Angular의 전반적인 환경을 설정하는 파일이다.

```json
"apps": [ // 어플리케이션 관련 설정
  {
    "root": "client", // 빌드된 결과물 소스가 생성될 경로[string]
    [...]
  }
],
[...],
"lint": [
  {
    "project": "client/tsconfig.app.json",
    "exclude": "**/node_modules/**"
  }
]
```

## 클라이언트 구조
client/app 디렉토리 여러 개의 컴포넌트

```
$ ng g c core/nav && ng g c home && ng g c main
```

위와 같은 컴포넌트 생성 명령어를 통해 클라이언트 구조를 구성한다.

```
client/
  app/
    core/
      nav/
    core.module.ts
    home/
    main/
    app.component.css
    app.component.html
    app.module.ts
    app.routes.ts
```

### core 디렉토리
`core` 디렉토리는 기타 기능의 집합소이다. 예를 들어 네비게이션 메뉴의 경우, 하나의 주 컴포넌트가 되기에는 적합하지 않다. 따라서 이러한 부수적인 요소를 core에 모아놓고 필요할 때 꺼내어 쓰면 된다.

**[core/nav/nav.component.html]**

```html
<section class="header-yellow">
  <article class="row">
    <input type="text" placeholder="검색어를 입력해 주세요">
    <img src="../../../assets/images/kmong_logo.png">
  </article>
</section>
```

**[core/core.module.ts]** <br />
nav 컴포넌트를 core 모듈에 등록하고 최종적으로 app 모듈에 등록을 해줘야 한다.
app 모듈에 대한 코드는 하단에 있다.

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './nav/nav.component';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [NavComponent],
  exports: [
    NavComponent
  ],
  providers: []
})
export class CoreModule {
}

```

### main 디렉토리
`main` 디렉토리는 네비게이션 메뉴와 같이 모든 페이지가 공통으로 쓰는 부분을 구성한다.

**[main/main.component.ts]**

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavComponent } from '../core/nav/nav.component';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  @ViewChild(NavComponent)
  navComponent: NavComponent;

  constructor() { }

  ngOnInit() {
  }
}
```

#### @ViewChild(ClassName)
- 자식 엘리먼트롤 호출 및 탐색하는 방벙중 하나로, 지시자를 통해 child에서의 엘리먼트 값을 가지고 온다.
- 가져온 엘리먼트는 selector 태그로 html 파일에서 사용된다.

**[main/main.component.html]**

```html
<app-nav></app-nav>
<router-outlet></router-outlet>
```

#### router-outlet
`router-outlet` 태그는 라우트가 설정된 url에 해당하는 컴포넌트를 보여준다.

## 생성된 컴포넌트 등록하기

**[app.routes.ts]** <br />
해당 컴포넌트들을 url을 통해 브라우저에서 접근할 수 있도록 라우팅 모듈 추가

```typescript
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';


export const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {path: '', component: HomeComponent}
    ]
  }
];

export const AppRouterModule = RouterModule.forRoot(routes, {
  useHash: true
});
```

**[app.module.ts]** <br />
생성된 모든 컴포넌트를 취합하여 app.module.ts 파일에 등록한다.

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRouterModule } from './app.routes';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MainComponent } from './main/main.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent, // HomeComponent 등록
    MainComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRouterModule // 라우터 모듈 임포트
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

#### BrowserModule
브라우저 상에서 동작한다면 반드시 포함해야 하며, 컴포넌트나 지시자, 파이프 같은 구성 요소를 템플릿에 나타나게 한다.

#### CommonModule
템플릿에서 사용하는 ngIf, ngFor와 관련된 기능을 포함한다. (브라우저 모듈에 포함)

**[app.component.html]** <br />

```html
<!-- Main view/routes wrapper-->
<router-outlet></router-outlet>
```

<br />

![](/assets/kmong_home.png){: .center-image}
