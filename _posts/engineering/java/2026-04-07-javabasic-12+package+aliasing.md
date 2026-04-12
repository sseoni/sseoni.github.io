---

layout: post
title: "[Java 기초] [참조] 패키지(Package) 기본개념, 생성, import"
date: 2026-04-07 00:03
tags: [스터디로그, java, 패키지, Package]
summary:

---

파이썬의 import as, 자바에는 왜 없을까?
파이썬이나 자바스크립트 등에서는 이름이 너무 길거나 다른 라이브러리와 이름이 충돌할 때, as 키워드를 써서 내 입맛대로 간편하게 별명을 지어줍니다.

하지만 자바는 **"코드가 아무리 길어지더라도, 누가 봐도 출처가 헷갈리지 않게 명확해야 한다(명시성)"**는 철학을 아주 강력하게 고집하는 깐깐한 언어입니다.

```Python
# [Python] as를 사용한 별명 지정 (자바에선 절대 불가능!)
import pandas as pd
from datetime import datetime as dt

df = pd.DataFrame()
today = dt.now()
```

**💡 자바에서 이름이 충돌하면 어떻게 버텨야 할까?**

바로 앞선 포스트의 🚨주의사항에서 다루었던 내용이, 바로 이 as 문법이 자바에 없기 때문에 탄생한 대처법입니다.

이름이 똑같은 두 클래스(java.util.Date와 java.sql.Date)를 한 파일에서 동시에 써야 한다면, 자바 개발자들은 import java.sql.Date as SqlDate 처럼 꼼수를 부릴 수 없습니다.

대신, 아주 묵묵하고 정직하게 **풀네임(Full Name)**을 다 적어주는 길을 택합니다.

```Java
// [Java] 겹치는 이름 피하기
import java.util.Date; 
// import java.sql.Date as SqlDate; // 💥 자바 컴파일러: "이런 문법은 없습니다!"

public class Main {
    // 1. 주로 쓰는 건 짧게 사용
    Date today = new Date(); 
    
    // 2. 겹치는 건 별명(as) 대신, 무식하더라도 '풀네임'을 다 써서 구별!
    java.sql.Date dbDate = new java.sql.Date(System.currentTimeMillis()); 
}
```

파이썬의 자유로움에 익숙하다면 이런 깐깐함이 조금 답답하게 느껴질 수 있습니다.
하지만 수십, 수백 명의 개발자가 함께 코드를 수정하는 대규모 환경에서는 오히려 "어떤 패키지의 클래스인지" 코드를 보자마자 100% 확신할 수 있다는 것이 자바의 큰 장점이 되기도 합니다.