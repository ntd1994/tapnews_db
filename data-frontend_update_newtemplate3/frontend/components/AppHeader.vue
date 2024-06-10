<template>
  <header>
    <div class="header">
      <div id="header-layout2" class="header-style5">
        <HeaderTop />
        <HeaderBottom />
      </div>
    </div>
  </header>
</template>

<style lang="scss">

$main-color: #F36C21;

.wrapper #sticker {
  background-color: $main-color;
}

.wrapper.not-home-page #sticker {
  background-color: rgb(240, 241, 244);
  ;
}

.not-home-page .header {

  .sign-up,
  a:has(+ .ne-dropdown-menu .active),
  .active {
    color: black !important;
    background-color: $main-color;
  }

  a:has(+ .ne-dropdown-menu .active):hover,
  .active:hover {
    color: black !important;
    background-color: #fff;
  }

  .main-menu-area {
    .bg-body {
      background-color: $main-color;
    }

    .ne-main-menu {
      nav {
        ul li {
          a:hover {
            color: #000;
            background-color: #fff;
          }

          a.active {
            background-color: #fff;
          }
        }
      }

      ul.ne-dropdown-menu {
        li {
          a.active {
            background-color: #fff;
          }

          a:hover {
            background-color: $main-color;
          }
        }
      }
    }
  }
}

.header {
  .header-menu-fixed {
    max-width: 1140px;
    margin: 0 auto;
  }

  /* .main-menu-area {
    padding-right: 15px;
    padding-left: 15px;
  } */

  .main-menu-area .bg-body {
    background-color: $main-color;
  }

  .main-menu-area .ne-main-menu nav ul li:hover a {
    color: #000;
    background-color: white;
  }

  .main-menu-area .ne-main-menu nav ul li a:hover {
    color: #000;
    background-color: white;
  }

  .main-menu-area .ne-main-menu nav ul li a {
    color: white;
    background-color: $main-color;
    display: block;
    font-family: Roboto, sans-serif !important;
    font-size: 14px;
    font-weight: 800;
    text-transform: uppercase;
    -webkit-transition: all .3s ease-out;
    -moz-transition: all .3s ease-out;
    -ms-transition: all .3s ease-out;
    -o-transition: all .3s ease-out;
    transition: all .3s ease-out
  }
}

.main-menu-area .ne-main-menu nav ul li ul.ne-dropdown-menu {
  >li {
    a:hover {
      background-color: $main-color;
    }
  }

  color: black;
}

.header-action-item input {
  display: none;
  top: 50%;
  transform: translateY(-50%)
}

.header-action-item ul li .fa-search {
  font-size: 25px !important;
  color: white !important;
}

.not-home-page .header-action-item .search-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: $main-color !important;
}

.not-home-page .header-action-item ul li .fa-search {
  font-size: 25px !important;
  color: #fff !important;
}
// .header-style5 .main-menu-area .ne-main-menu nav ul li:not(.logo-area) a {
//     padding: 30px 8px;
//     color: black
// }
.header {
  .main-menu-area {
    .ne-main-menu {
      nav {
        ul {
          li {
            a {
              padding: 20px 8px;
            }
          }
        }
      }
    }
  }
}

.header .menu {
  display: block
}

@media screen and (max-width:992.9px) {
  .header .menu-left {
    display: none;
  }

  .header .top-bar-bottom {
    display: none;
  }

  .header-action-item ul li .fa-search {
    font-size: 25px !important;
    color: #232323 !important;
  }
}

@media screen and (max-width:576px) {
  .header-action-item .search-icon {
    background-color: transparent !important;
  }
}</style>
