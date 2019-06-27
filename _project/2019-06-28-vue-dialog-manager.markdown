---
layout: post
title:  "vue-dialog-manager"
date:   2019-06-28 05:08:59 +0900
---
## 프로젝트 설명
---

다이얼로그는 언제 사용될까?

일반적으로 웹페이지에서 다이얼로그만 있는 페이지는 없다.

다이얼로그는 일반적으로 사용자의 행동에의해 나타나거나 사라진다.

곧 동적인 요소이다. 동적 요소는 자바스크립트의 영역이다.

그러나 일반적으로 다이얼로그가 쓰이는 방법은 다음과 같다.

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
  </div>
</template>
~~~

<span style="color:pink">index.vue</span>

~~~vue
<template>
  <dialog v-if="isShow" @click="showDialog"></dialog>
</template>
<script>
  import Dialog from './dialog.vue';

  export default {
    components: {
      Dialog
    },
    data () {
     return {
      isShow:false
     }
    },
    methods: {
     showDialog() {
      this.isShow = true;
     }
    }
  }
</script>
~~~

HTML영역에 tag가 추가되고 그 element를 제어하기 위한 isShow도 필요하다.

위 다이얼로그엔 한가지 더 문제가 있다. 

dialog로부터 사용자의 행동에 대한 결과를 받아야 하는 경우

Dialog.vue 파일에 emit메소드를 호출해줘야 한다.

개인적으로 이 부분을 상당히 번거롭다고 느꼈고 일련의 과정을 패키징한 모듈을 만들었다.

사용하다보니 여러 프로젝트에서 자주 사용하게 되었고
 
이러한 이유로 npm 모듈을 등록하였다.

<br>

## 저장소
---

[깃 허브로 이동](https://github.com/ebool/vue-dialog-manager){: target="_blank"}

[npm](https://www.npmjs.com/package/vue-dialog-manager){: target="_blank"}


## 구성
---

프로젝트는 자바스크립트로 진행한 단순한 구조이다.

index.js 파일밖에 없는데 webpack 번들러를 사용하는 웃긴 프로젝트이다.

언젠가 library target을 여러개로 만들걸 고려한 도입이었다.

minimize, uglify의 적용도있을지 모르니..

<br>

## 사용법
---

### Installing

Using npm:
~~~

 npm install vue-dialog-manager
 
~~~

### Example

First, we need dialog.vue

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
  </div>
</template>
~~~

and then,

## 1. Showing dialog

~~~vue
<script>
  import Dialog from './dialog.vue';
  import DialogManager from 'vue-dialog-manager';

  export default {
    methods: {
     showDialog () {
      let instance = DialogManager.create(Dialog);
      instance.show();
     }
    }
  }
</script>
~~~

create() 함수는 instance를 반환한다.

create(vueComponent, options)는 두개의 파라미터를 입력 할 수 있다.

VueComponent엔 보여줄 dialog의 [컴포넌트](https://vuejs.org/v2/guide/components.html){: target="_blank"}를 넘겨준다.

options에 대해선 다음 항목에서 설명하겠다. 

반환된 instance의 show(), dismiss()로 다이얼로그를 켜고 끌 수 있다. 

(instance는 Vue.extend를 통해 반환 받은 값인데 이를 잘 모른다면 => [링크](https://vuejs.org/v2/api/#Vue-extend){: target="_blank"})

## 2. Send data to dialog.vue

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
    <div>{{message}}</div>
  </div>
</template>
<script>
  export default {
    props: ['message']
  }
</script>
~~~

만약 dialog.vue로 message를 보내고 싶다면 다음과 같이 작성하라.

<span style="color:pink">index.vue</span> 

~~~vue
<script>
  import Dialog from './dialog.vue';
  import DialogManager from 'vue-dialog-manager';

  export default {
    methods: {
     showDialog () {
      let instance = DialogManager.create(Dialog, {
        props: {
          message: 'this is dialog'
        }
      });
      instance.show();
     }
    }
  }
</script>
~~~

create의 두번째 인자를 소개하겠다.

options: { props : Object, store : vuex store}

props: 객체형태로 원하는 데이터를 객체형태로 전달할 수 있다.

store: 만약 vuex를 사용한다면 store를 전달 할 수 있다. 전달된 store는 dialog.vue에서 this.$store로 접근할 수 있다.

## 3. Dismiss

create() 함수에서 반환된 instance에 등록되어있는 dismiss를 통해 끌 수 있다.

instance는 dialog.vue에서 this로 접근 가능하다.

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
    <button @click="close">close</button>
  </div>
</template>
<script>
  export default {
    methods: {
     close () {
      this.dismiss()
     }
    },
  }
</script>
~~~

좀 더 간단한 형태를 원한다면 다음과 같이 사용할 수 있다.

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
    <button @click="dismiss">close</button>
  </div>
</template>
~~~

## 4. Callback

사용자의 행동으로부터 받은 데이터는 다음과 같이 전달한다.

<span style="color:pink">dialog.vue</span> 

~~~vue
<template>
  <div class="dialog">
    <h1>hello dialog</h1>
    <button @click="close">close</button>
  </div>
</template>
<script>
  export default {
    methods: {
     close () {
      this.dismiss("input user data")
     }
    },
  }
</script>
~~~

dismiss함수를 통해 데이터를 전달한다.

<span style="color:pink">index.vue</span> 

~~~vue
<script>
  import Dialog from './dialog.vue';
  import DialogManager from 'vue-dialog-manager';

  export default {
    methods: {
     showDialog () {
      let instance = DialogManager.create(Dialog);
      instance.show().then((userData) => {
        console.log('user data: ', userData)
      })
     }
    }
  }
</script>
~~~

show()은 promise를 반환한다. 그러므로 then 구문을 사용하여 처리 가능하다.

만약 당신이 ECMAScript 2017를 사용한다면 훨씬 깔끔한 코드를 작성할 수 있다.

<span style="color:pink">index.vue</span> 

~~~vue
<script>
  import Dialog from './dialog.vue';
  import DialogManager from 'vue-dialog-manager';

  export default {
    methods: {
     async showDialog () {
      let instance = DialogManager.create(Dialog);
      let userData = await instance.show();
      console.log('user data: ', userData)
     }
    }
  }
</script>
~~~

## 맺음
---

npm module 배포가 처음이라 아직 부족한 점이 많다.

다만 버그는 없게 만들고 싶었는데 혹시 사용하게 되는 사람이 있다면,

그리고 버그를 발견하게 된다면.

[이슈](https://github.com/ebool/vue-dialog-manager/issues){: target="_blank"}를 남겨주길 바란다.
 

