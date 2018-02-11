---
layout: post
title:  "상속(Inheritance)"
category: [컴퓨터 사이언스, css]
tags:
  - OOP
comments: true
---

상속은 자식 클래스가 부모 클래스의 모든 멤버와 메소드를 이어받는것을 의미한다. <br>
하지만 상속은 아무때나 쓰면 안됀다. 언제 상속을 쓰고 언제 상속을 쓰면 안됄까?

## is-a

```docker
A laptop is a computer (O)
A desktop is a computer (O)
A laptop is a desktop (X)
```

노트북은 컴퓨터의 일종으로 컴퓨터가 가지고 있는 모든 속성을 가지고 있다. 데스크탑과 노트북은 많은 특성들을 공유하지만 공유하지 않는 부분도 존재하기 때문에 **데스크탑을 노트북이라고 할 수 없다.** <br>
따라서 **laptop은 desktop의 클래스를 상속받을 수 없다.**

즉, 상속 여부를 판단하는 기준은 자식 클래스가 부모 클래스에 `is a로 합당한가`를 고려하는 것이다.

이 때, 공유되는 특성을 부모 클래스에 정의하고, 그렇지 않은 특성만 각자 클래스에 따로 정의한다.

## 오버로딩과 오버라이딩
### 오버로딩
같은 공간 안에 같은 이름의 함수를 정의하는 것, 하지만 파이썬에서는 절대 오버로딩을 인정하지 않는다. 에러는 발생하지 않지만 나중에 선언한 하나의 메서드만 인정한다.

> In Python you have to write a single constructor that catches all cases using default arguments <br>
> The last method overwrites any previous method 마지막에 정의한 메소드가 그 전에 정의한 메소드를 모두 덮어버린다.

#### in 파이썬

```python
class Computer:
    def __init__(self, cpu, ram, hard_disk):
        self.cpu = cpu
        self.ram = ram
        self.hard_disk = hard_disk

    def calculate(self, a, b):
        print("overloading test", a+b)

    def calculate(self, ):
        print("computer calculating")

com = Computer("i7", "12GB", "1TB")
com.calculate()
com.calculate(2, 3)
```

[결과]

![]({{site.url}}/assets/calc_python.png){: .center-image }

하지만 C나 Java 등에서는 함수 이름이 같아도 반환형과 인자의 개수만 다르다면 함수를 몇 개든지 만들 수 있다.

#### in 자바

```java
class Computer {
    public void calculrate() {
        System.out.println("computer calculating");
    }

    public void calculrate(int a, int b) {
        System.out.println("overloading test " + result);
    }
}

public class OverLoading {
    public static void main (String[] args) {
        Computer com = new Conputer();
        com.calculrate();
        com.calculrate(2, 3);
    }
}
```

[결과]

![]({{site.url}}/assets/calc_java.png){: .center-image }

### 오버라이딩
오버라이딩 같은 이름의 함수가 존재한다면 상속받는 함수보다는 현재 객체에서 정의하고 있는 함수의 우선 순위가 더 높다.

```python
class Computer:
    def __init__(self, cpu, ram, hard_disk):
        self.cpu = cpu
        self.ram = ram
        self.hard_disk = hard_disk

    def calculate(self, ):
        print("computer calculating")


class Laptop(Computer):
    def __init__(self, cpu, ram, hard_disk, touch_pad="normal"):
        Computer.__init__(self, cpu, ram, hard_disk)
        self.touch_pad = touch_pad

    def calculate(self):
        print("laptop calculating, a little bit slow")
```

- Computer의 속성을 정의하지 않아도 상속받았기 때문에 calculator()가 존재한다.
- 하지만 Laptop은 노트북이므로 조금 느린 연산을 한다는 것을 표현하고자 재정의하였다.

[결과]

```
>>> l1 = Laptop("i7", "12GB", "1TB")
>>> l1.calculate()
laptop calculating, a little bit slow
```

## has-a
현재는 잘 쓰이지 않지만 옛날에는 이 조건에서도 상속을 사용했었음을 알아야 할 필요가 있다.

```docker
A policeman has a gun
```

경찰관은 총을 가지고 있다, 총을 상속받으면 위 문장을 표현할 수 있다. 하지만 경찰관은 총을 가지고 있기도, 가지고 있지 않기도 하다는 것을 고려해야한다. 이럴 때 사용하는 것이 바로 `객체 합성`이다.

```python
class Gun:
    def __init__(self, kind):
        self.kind = kind

    # 총알이 나가는 것
    def bbangya(self):
        print("빵야~ 빵야~")

# 객체 합성(객체 속의 객체) != 상속
class Police:
    def __init__(self, gun_kind=''):
        if gun_kind:
            # 총(의 종류)을 가지고 있다면, 총 객체를 만들어서 인스턴스 멤버로 가짐.
            self.gun = Gun(gun_kind)
        else:
            # 총이라는 멤버 이름은 존재하지만 'None'으로 빈 값을 세팅, 나중에 총을 가질 여지가 있음.
            self.gun = None

        # 총이 없는 경찰에게 총을 얻도록,
        # 총을 가진 경찰에게 다른 종류의 총을 얻도록.    
        def get_gun(self, gun_kind            
            self.gun = Gun(gun_kind)

        # 경찰관이 총을 겨누는 것
        def shoot(self):
            if self.gun: # 인스턴스 멤버로 해당 객체(Gun)를 가지고 있다면,
                self.gun.bbangya()
            else:
                print("총을 소지하고 있지 않습니다.")
```

[결과]

```
>>> p1 = Police("리볼버")
>>> p1.shoot()
빵야~ 빵야~

>>> p2 = Police()
>>> p2.shoot()
총을 소지하고 있지 않습니다.

>>> p2.get_gun("기관총")
>>> p2.shoot()
빵야~ 빵야~
```

위와 같이 객체를 핸들링하는 것을 `객체 합성`이라고 하며 이럴 경우(has-a) 상속을 사용하는 것은 부적절하다.
