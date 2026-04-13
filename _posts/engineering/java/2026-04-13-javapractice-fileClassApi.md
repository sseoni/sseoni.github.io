---
layout: post
title: "[Java 활용] File 클래스 핵심 메서드 총정리 (파일/폴더 제어)"
date: 2026-04-13 19:00
tags: [스터디로그, java, IO, File, Directory, API]
summary: 자바에서 파일과 폴더의 껍데기(생성, 삭제, 정보 조회)를 관리하는 java.io.File 클래스의 핵심 메서드들을 완벽하게 정리한다.
---

앞선 입출력(I/O) 기초 포스트에서 `File` 클래스는 파일 안의 내용을 읽고 쓰는 것이 아니라, 파일이나 폴더의 **'존재 자체(생성, 삭제, 정보 확인)'를 관리하는 역할**을 한다고 배웠다.

{% include link-card.html url="/blog/engineering/java/javabasic-28-io-file" %}

실무에서 첨부파일 업로드 기능을 만들거나 특정 폴더 안의 파일 목록을 긁어와야 할 때, `File` 클래스는 아주 빈번하게 사용된다. 활용도가 가장 높은 핵심 메서드 11가지를 표와 코드로 깔끔하게 정리해 본다.

## 1. File 클래스 핵심 기능 요약 (Cheat Sheet)

`File file = new File("my_folder/test.txt");` 와 같이 경로가 지정된 객체가 생성되어 있다고 가정할 때, 제공되는 기능은 다음과 같다.

### 📝 생성 및 삭제 관련
| 기능 (Method) | 설명 | 사용 예시 |
| :--- | :--- | :--- |
| **`createNewFile()`** | 실제 물리적인 **새 파일**을 생성한다. | `file.createNewFile();` |
| **`mkdir()`** | 지정된 경로에 **폴더를 1개** 만든다. | `file.mkdir();` |
| **`mkdirs()`** | 지정된 경로에 필요한 **상위 폴더들까지 한 번에** 만든다. | `file.mkdirs();` |
| **`delete()`** | 파일 또는 폴더를 **삭제**한다. | `file.delete();` |

### 🔍 정보 조회 및 확인 관련
| 기능 (Method) | 설명 | 사용 예시 | 결과 예시 |
| :--- | :--- | :--- | :--- |
| **`exists()`** | 파일/폴더 **존재 여부** 확인 | `if (file.exists()) { ... }` | `true` / `false` |
| **`isFile()`** | 현재 경로가 **파일인지** 확인 | `if (file.isFile()) { ... }` | `true` / `false` |
| **`isDirectory()`**| 현재 경로가 **폴더인지** 확인 | `if (file.isDirectory()) { ... }` | `true` / `false` |
| **`getName()`** | 파일/폴더의 **이름** 정보 | `file.getName();` | `"test.txt"` |
| **`getAbsolutePath()`**| 최상위 드라이브부터 시작하는 **절대 경로** 정보 | `file.getAbsolutePath();` | `"C:\Users\my_folder\test.txt"` |
| **`length()`** | 파일의 **크기** 반환 (Byte 단위) | `file.length();` | `1024` |
| **`listFiles()`** | 특정 폴더 안의 **파일/폴더 목록**을 배열로 반환 | `File[] list = file.listFiles();` | `[File객체1, File객체2]` |


## 2. 💻 코드로 보는 파일/폴더 제어 흐름

'작업 공간(Workspace)' 폴더를 만들고, 그 안에 '보고서' 파일을 생성한 뒤 정보를 확인하는 실전 예제를 살펴보자.

```java
import java.io.File;
import java.io.IOException;

public class FileApiEx {
    public static void main(String[] args) {
        
        // 1. 폴더 생성하기
        File folder = new File("workspace");
        if (!folder.exists()) {
            folder.mkdir(); // 폴더가 없으면 새로 만들기
            System.out.println("폴더 생성 완료");
        }

        // 2. 파일 생성하기 (폴더 경로 내부에)
        File file = new File(folder, "report.txt");
        try {
            if (!file.exists()) {
                file.createNewFile(); // 파일이 없으면 새로 만들기
            }
        } catch (IOException e) {
            System.out.println("파일 생성 실패: " + e.getMessage());
        }

        // 3. 파일/폴더 정보 확인하기
        System.out.println("이름: " + file.getName());
        System.out.println("절대 경로: " + file.getAbsolutePath());
        System.out.println("크기: " + file.length() + " Bytes");
        System.out.println("파일이 맞나요? " + file.isFile());       // true
        System.out.println("폴더가 맞나요? " + folder.isDirectory()); // true

        // 4. 특정 폴더 안의 내용물 목록 조회 (listFiles)
        System.out.println("\n--- [workspace] 폴더 내용물 ---");
        File[] filesInside = folder.listFiles(); // 폴더 안의 모든 요소를 배열로 가져옴
        
        for (File f : filesInside) {
            System.out.println("- " + f.getName());
        }
    }
}
```

**💡 Tips**: `mkdir()` vs `mkdirs()`의 결정적 차이
초보자들이 폴더를 만들 때 가장 많이 겪는 에러가 바로 이 두 메서드를 혼동해서 발생한다.

예를 들어 `new File("2026/04/17")` 이라는 경로로 폴더를 만들고 싶다고 가정해 보자.

`mkdir()`: 오직 마지막 폴더(`17`) 한 개만 생성하려 시도한다. 만약 부모 폴더인 `2026`이나 `04` 폴더가 미리 만들어져 있지 않다면 생성에 실패(`false` 반환)한다.

`mkdirs()`: 마지막 폴더를 만들기 위해 경로상에 필요한 모든 부모 폴더(`2026`, `04`)를 알아서 한 번에 다 만들어버린다. 따라서 실무에서는 여러 단계 깊이의 폴더를 생성해야 할 일이 많으므로, 특별한 이유가 없다면 `mkdirs()`를 사용하는 것이 훨씬 안전하고 편리하다.