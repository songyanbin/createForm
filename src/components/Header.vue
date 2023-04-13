<template>
  <div class="header">
    <div class="logo-box">
    </div>
    <div class="system-name">自定义表单</div>
    <div class="empty-box"></div>
  </div>
</template>
c
<script>
    export default {
        name: "Header",
        data() {
            return {
            };
        },
    };
</script>

<style scoped lang="less">
  .header {
    height: 64px;
    padding-right: 30px;
    display: flex;
    align-items: center;
    background: linear-gradient(225deg,
    rgba(128, 177, 254, 1) 0%,
    rgba(89, 149, 253, 1) 100%);
    box-shadow: 0 7px 8px -6px rgba(0, 0, 0, 0.08);

    .logo-box {
      padding-left: 30px;
      display: flex;
      align-items: center;

      .logo {
        width: 46px;
        height: 46px;
        display: block;
      }
    }

    .system-name {
      padding-left: 22px;
      font-size: 16px;
      line-height: 22px;
      color: #ffffff;
    }

    .empty-box {
      flex: 1;
    }
    .limit-txt {
      color: #ffffff;
      padding-right: 10px;
      font-size: 16px;
    }
    .language-box {
      width: 130px;
      height: 30px;
      border: 1px solid #ffffff;
      border-radius: 4px;
      display: flex;

      .item {
        flex: 1;
        text-align: center;
        line-height: 30px;
        font-size: 14px;
        color: #ffffff;
        background: transparent;
        cursor: pointer;

        &.active {
          background: #ffffff;
          color: #2699fb;
        }
      }
    }

    .balance-box {
      margin-left: 40px;
      height: 30px;
      padding: 0 10px 0 4px;
      border: 1px solid rgba(255, 255, 255, 0.3);
      display: flex;
      align-items: center;
      color: #ffffff;
      border-radius: 4px;

      .icon {
        font-size: 20px;
      }

      .txt {
        font-size: 16px;
        line-height: 22px;
        padding-left: 6px;
      }
    }

    .recharge-btn {
      margin-left: 40px;
      width: 72px;
      height: 30px;
      background: #ffffff;
      border-radius: 3px;
      text-align: center;
      line-height: 30px;
      color: #000000;
      cursor: pointer;
      font-size: 14px;
    }

    .message-box {
      position: relative;
      color: #ffffff;
      margin-left: 40px;
      cursor: pointer;

      .icon {
        font-size: 20px;
        display: block;
      }
    }

    .user-box {
      margin-left: 50px;
      display: flex;
      align-items: center;

      .head-portrait {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        display: block;
      }

      .role-box {
        padding-left: 10px;

        .name {
          font-size: 14px;
          line-height: 14px;
          color: #ffffff;
          padding-bottom: 3px;
          white-space: nowrap; /*内容超宽后禁止换行显示*/
          overflow: hidden; /*超出部分隐藏*/
          text-overflow: ellipsis; /*文字超出部分以省略号显示*/
          max-width: 178px;
        }

        .role {
          padding: 0 14px;
          font-size: 12px;
          line-height: 14px;
          text-align: center;
          background: #57d2fc;
          color: #ffffff;
          border-radius: 4px;
          display: inline-block;
        }
      }
    }

    .sign-out {
      margin-left: 44px;
      cursor: pointer;
      font-size: 14px;
      color: #ffffff;
    }
  }
</style>
