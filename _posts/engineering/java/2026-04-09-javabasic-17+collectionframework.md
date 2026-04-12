---

layout: post
title: "[Java 기초] 컬렉션 프레임워크 (List, Set): 무한확장"
date: 2026-04-09 00:00
tags: [스터디로그, java, List, Set]
summary:

---

배열(Array)은 크기가 고정되어 있다는 단점이 있었다.
자바는 이를 해결하기 위해 데이터를 무한히 담고, 쉽게 지울 수 있는 마법의 바구니 세트인 **컬렉션 프레임워크(Collection Framework)**를 제공한다.

{% include link-card.html url="/blog/engineering/java/javabasic-17+array-collection" %}

이 바구니들은 방금 배운 '제네릭스'를 활용해 만들어진다. 가장 대표적인 자료형은 List와 Set이다.

## 1. 리스트 (List): 순서가 있고, 중복을 허용하는 줄서기

**데이터가 삽입된 순서를 엄격하게 유지**하며, **동일한 데이터의 중복 저장을 허용**하는 선형 자료구조다. (대기표 시스템과 같다.)

### `ArrayList` (동적 배열)
자바에서 가장 보편적으로 사용되는 자료구조다.

내부적으로는 배열을 사용하지만, 꽉 차면 알아서 큰 배열로 이사하여 크기를 무한히 늘린다.
메모리가 연속적으로 할당되어 있다.

**장점**: 각 데이터가 고유한 인덱스(Index) 번호를 가지므로, `get(index)`를 통해 특정 위치의 데이터를 $O(1)$의 속도로 즉시 조회할 수 있다.

**단점**: 리스트의 중간에 데이터를 삽입하거나 삭제할 경우, 그 뒤에 있는 모든 데이터의 인덱스를 한 칸씩 밀거나 당겨야 하는 오버헤드(Overhead)가 발생하여 성능이 저하된다.

### `LinkedList` (이중 연결 리스트)
각 데이터가 자신의 값과 **앞뒤 데이터의 메모리 주소(참조 포인터)**를 가진 노드(Node) 형태로 서로 연결되어 있는 구조다.

**장점**: 중간에 데이터를 삽입하거나 삭제할 때, 데이터들을 이동시킬 필요 없이 앞뒤 노드의 참조 포인터만 끊어서 새로 연결해주면 되므로 처리 속도가 매우 빠르다.

**단점**: 인덱스가 없으므로 특정 위치의 데이터를 찾으려면 첫 번째 노드부터 순차적으로 탐색(Sequential Access)해야 하여 조회 속도가 느리다.


## 2. 셋 (Set): 순서가 없고, 중복을 절대 불허하는 주머니
`Set` 인터페이스를 구현한 클래스들은 데이터의 **저장 순서를 보장하지 않으며**, **동일한 데이터의 중복을 원천적으로 차단**하는 자료구조다. (수학의 '집합'과 같다.)

### `HashSet` (해시 기반 집합)
`Set`의 가장 대표적인 구현체다. 방문자 IP 중복 제거, 로또 번호 생성 등 고유한 값만 걸러내야 하는 비즈니스 로직에 아주 유용하게 쓰인다.
* **구조**: 내부적으로 해시 알고리즘(Hash Algorithm)을 사용하여 데이터를 저장한다.
* **중복 판별 원리**: 데이터가 입력되면 객체의 `hashCode()` 메서드를 호출하여 해시값을 비교하고, 값이 같으면 `equals()` 메서드로 내부 데이터까지 동일한지 2차 검증을 수행하여 중복을 완벽하게 걸러낸다.

```Java
import java.util.ArrayList;
import java.util.HashSet;

public class CollectionEx {
    public static void main(String[] args) {
        // [1. ArrayList 예시] 순서 보장 O, 중복 허용 O
        ArrayList<String> list = new ArrayList<>();
        list.add("사과");
        list.add("바나나");
        list.add("사과"); // 중복 허용!

        System.out.println("List: " + list); // 출력: [사과, 바나나, 사과]
        System.out.println("1번 인덱스: " + list.get(1)); // 바나나 (빠른 조회)

        // [2. HashSet 예시] 순서 보장 X, 중복 허용 X
        HashSet<String> set = new HashSet<>();
        set.add("사과");
        set.add("바나나");
        set.add("사과"); // 중복 거부! (무시됨)

        System.out.println("Set: " + set); // 출력: [사과, 바나나] (순서는 무작위)
    }
}
```