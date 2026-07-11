---
layout: post
title: "[정처기 실기] 파이썬 벼락치기: 코드 압축하기 (컴프리헨션, enumerate, join)"
date: 2026-07-10
tags: [정보처리기사, 실기, 파이썬, Python, 리스트컴프리헨션, enumerate, join]
summary: 2025년 이후 정처기 실기 파이썬 코드 해석의 핵심 키! 한 줄로 코드를 압축하는 컴프리헨션과 필수 내장 함수 enumerate, join을 완벽 정리합니다.
---

과거 정처기 실기에서는 `for`문과 `if`문을 길게 늘여 쓰는 전통적인 코드가 많이 나왔습니다. 하지만 최근 시험에서는 이를 단 한 줄로 압축해 버리는 **'파이썬다운(Pythonic)'** 코드가 무더기로 쏟아지고 있습니다. 이 문법들을 눈에 익혀두지 않으면 시험장에서 코드를 읽어낼 수조차 없습니다. 출제 빈도 1순위인 핵심 문법 3가지를 부숴봅시다.

---

## 리스트 컴프리헨션 (List Comprehension)

리스트 안에 `for`문과 `if`문을 때려 넣어서, **한 줄 만에 새로운 리스트를 뚝딱 만들어내는 마법의 문법**입니다. 2025년 이후 기출에서 숨 쉬듯이 등장하고 있습니다.
**📌 기본 구조: `[표현식 for 변수 in 반복가능객체 if 조건문]`**

```python
arr = [1, 2, 3, 4, 5]

# ❌ 전통적인 C언어 스타일 (3줄 필요)
result1 = []
for x in arr:
    result1.append(x * 2)

# ✅ 파이썬 컴프리헨션 스타일 (1줄 끝)
# 해석: arr에서 x를 하나씩 꺼내서, x*2를 한 값으로 리스트를 만들어라!
result2 = [x * 2 for x in arr]  

print(result2) # 출력: [2, 4, 6, 8, 10]
```

## 인덱스와 값을 동시에: `enumerate()`

보통 for문을 돌릴 때 '값'만 꺼내오거나, `range(len())`을 써서 '인덱스(순서 번호)'만 가져오곤 합니다. 그런데 인덱스와 값이 둘 다 필요할 때 쓰는 함수가 바로 `enumerate()`입니다. (2025년 3회차 기출)
**📌 기본 구조: `for a, b in enumerate(배열):`**

```Python
data = ["Apple", "Banana", "Cherry"]

# ❌ 전통적인 방식 (코드가 지저분함)
for i in range(len(data)):
    print(f"인덱스 {i}: {data[i]}")

# ✅ enumerate() 활용 방식
# i에는 순서 번호(0, 1, 2...)가 들어가고, val에는 실제 값이 들어갑니다.
for i, val in enumerate(data):
    print(f"인덱스 {i}: {val}")
    
# 출력 결과 (두 방식 모두 동일)
# 인덱스 0: Apple
# 인덱스 1: Banana
# 인덱스 2: Cherry
```

### 💡 Tip

`for a, b in enumerate(배열):` 형태가 나오면 무조건 "a는 방 번호, b는 알맹이"라고 해석하고 넘어갑니다.

## 리스트를 문자열로 합체: `join()`

문자열을 쪼개서 리스트로 만드는 함수가 `split()`이라면, 반대로 리스트의 파편들을 하나의 문자열로 본드처럼 붙여버리는 함수가 `join()`입니다. (2026년 1회차 기출)
**📌 기본 구조: `'연결할_문자'.join(리스트)`**

```Python
word_list = ["Human", "Dev", "2026"]

# 1. 띄어쓰기(' ')를 본드 삼아 합치기
result1 = ' '.join(word_list)
print(result1) # 출력: Human Dev 2026

# 2. 붙임표('-')를 본드 삼아 합치기
result2 = '-'.join(word_list)
print(result2) # 출력: Human-Dev-2026

# 3. 🚨 가장 많이 나오는 형태 (빈 문자열)
# 본드를 안 바르고(공백 없이) 그냥 바짝 붙여버립니다.
result3 = ''.join(word_list)
print(result3) # 출력: HumanDev2026
```

## 💥 실전 융합 디버깅 (26년 1회차 킬러 패턴)

위에서 배운 3가지가 한 줄에 섞여서 나오면 이렇게 됩니다. 당황하지 말고 괄호 안쪽부터 차근차근 해석하세요.

```Python
word = "HumanDev"

# 역순으로 뒤집은 문자열(veDnamuH)에서
# 'o', 'n', 'g'가 아닌 글자만 골라내어 (컴프리헨션 + if)
# 공백 없이 찰싹 붙여라 (join)
z = ''.join(c for c in word[::-1] if c not in 'ong')

print(z) 
# 과정: v, e, D, a, m, u, H (n은 필터링됨)
# 출력: veDamuH
```