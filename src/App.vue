<template>
  <div id="app">
    <!-- 导航栏 -->
    <nav class="navbar navbar-expand-lg navbar-light" id="navbar">
      <a class="navbar-brand" href="#">澈澈<span class="sr-only">(current)</span></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">个人作品</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">个人简历</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">GitHub</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">SegmentFault</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              联系我
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">微博 @spolier丶</a>
              <a class="dropdown-item" href="#">微信 @方正</a>
              <a class="dropdown-item" href="#">企鹅 @678477181</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">留言</a>
            </div>
          </li>
        </ul>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss" scoped>

  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  #navbar {
    background-color: transparent;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    a:not(.dropdown-item) {
      color: #fff;
      text-decoration: none;
      -webkit-transition: color 0.25s ease;
      -moz-transition: color 0.25s ease;
      -ms-transition: color 0.25s ease;
      transition: color 0.25s ease;
      &:hover {
        color: rgba(255,255,255,0.75);
        text-decoration: none;
      }
    }
    a.dropdown-item {
      font-size: .875rem;
      white-space: nowrap;
    }
    .navbar-brand {
      padding: 0;
      font-weight: 600;
    }
    .navbar-nav {
      .nav-item {
        .nav-link {
          font-size: .875rem;
        }
      }
    }
  }
</style>
