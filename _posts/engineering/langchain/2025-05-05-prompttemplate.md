---
layout: post

title: "Langchain: PromptTemplate"
date: 2025-05-05
tags: [스터디로그, Langchain, NLP, LLM]
summary:
---

### 주요 함수 & 메서드 정리:

| 함수/메서드 | 설명 |
| --- | --- |
| `PromptTemplate.from_template(str)` | `{}` 변수 기반의 템플릿 생성. 가장 간단하고 많이 씀 |
| `PromptTemplate(input_variables=[...], template=...)` | 변수와 템플릿을 직접 지정. `from_template`보다 더 명시적 |
| `format(**kwargs)` | 템플릿 안의 변수들을 실제 값으로 채워서 프롬프트 문자열 생성 |
| `partial(**kwargs)` | 템플릿 일부 변수만 미리 채워서 새로운 PromptTemplate을 반환 |
| `format_prompt(**kwargs)` | (LCEL 스타일) 텍스트가 아니라 PromptValue 객체 반환 |
| `invoke()` | LLM과 연결된 체인에서 사용하는 경우, `PromptTemplate` 자체를 하나의 단계로 사용 가능함 (LCEL 문맥에서 중요) |

### ① `from_template()` - 가장 흔하게 사용됨

```python
PromptTemplate.from_template("Translate {text} to French.")
```

- 빠르고 간단하게 템플릿 만들 수 있음
- 내부적으로 `input_variables`를 자동 추론

---

### ② `PromptTemplate(input_variables=[...], template=...)` - 직접 제어

```python
PromptTemplate(
    input_variables=["topic"],
    template="Write a short story about {topic}"
)
```

- **변수 수동 지정** → 실수 줄이기 좋음
- 자동 추론보다 안정적

---

### ③ `partial()` - 일부 변수를 미리 고정하고 나머지만 바꿀 수 있음

```python
partial_prompt = prompt.partial(language="French")
partial_prompt.format(english="Good night")
```

- 반복되는 변수 값을 고정해서 **재사용성** 높임

---

### ④ `format_prompt()` vs `format()`

```python
prompt.formt_prompt(topic="pizza")
```

- `format()`은 문자열 반환
- `format_prompt()`는 LLM에 전달할 PromptValue 객체 반환 → **LCEL에서 필수**

---

### ⑤ `invoke()` - 최신 LCEL 문맥에서 중요

```python
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI

prompt = PromptTemplate.from_template("Translate {text} to French")
llm = ChatOpenAI()
chain = prompt | llm

chain.invoke({"text": "How are you?"})
```

- 이제 `PromptTemplate`은 단순 텍스트 생성기가 아니라, **LCEL 파이프라인의 구성 요소**로도 작동함
- `.invoke()`는 LCEL에서 모든 객체에 통일된 실행 인터페이스 제공

---

## 최신 흐름: LCEL + 프롬프트 분리 관리

LangChain에서는 최신 흐름에서 **PromptTemplate을 다음처럼 활용**해:

### ✅ 흐름 예시

```python
from langchain.prompts import ChatPromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain.schema.output_parser import StrOutputParser

prompt = ChatPromptTemplate.from_template("Tell me a joke about {topic}")
llm = ChatOpenAI()
parser = StrOutputParser()

chain = prompt | llm | parser
result = chain.invoke({"topic": "dogs"})
```

### 🚀 최신 흐름 핵심 요약:

- `ChatPromptTemplate` 사용 → Chat 모델 대응
- `|` 파이프 문법으로 체인 구성 (LCEL 스타일)
- 프롬프트, LLM, 출력 파서를 분리해서 관리
- `.invoke()` 하나로 실행 (동기 처리, LangGraph 연동도 쉬움)

---

## ✅ 마무리 요약

| 목적 | 함수/클래스 | 설명 |
| --- | --- | --- |
| 간단한 프롬프트 생성 | `from_template()` | 가장 직관적 |
| 세부 변수 지정 | `PromptTemplate(input_variables=...)` | 명시적으로 제어 가능 |
| 재사용성 향상 | `partial()` | 일부 변수 고정 |
| LLM 체인에 연결 | `format_prompt()` / `invoke()` | LCEL 기반 파이프라인에 필수 |
| 최신 스타일 | `ChatPromptTemplate` + ` | ` 파이프 |