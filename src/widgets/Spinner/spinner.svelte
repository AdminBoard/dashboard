<style lang="scss">
    .spinner {
        padding: 8px;
        width: 50px;
        height: 40px;
        text-align: center;
        font-size: 10px;
        & > div {
            background-color: #333;
            height: 100%;
            width: 6px;
            display: inline-block;

            -webkit-animation: spinnerdelay 1.2s infinite ease-in-out;
            animation: spinnerdelay 1.2s infinite ease-in-out;
        }
        & .rect2 {
            -webkit-animation-delay: -1.1s;
            animation-delay: -1.1s;
        }
        & .rect3 {
            -webkit-animation-delay: -1s;
            animation-delay: -1s;
        }
        & .rect4 {
            -webkit-animation-delay: -0.9s;
            animation-delay: -0.9s;
        }
        & .rect5 {
            -webkit-animation-delay: -0.8s;
            animation-delay: -0.8s;
        }
    }

    @-webkit-keyframes spinnerdelay {
        0%,
        40%,
        100% {
            -webkit-transform: scaleY(0.4);
        }
        20% {
            -webkit-transform: scaleY(1);
        }
    }

    @keyframes spinnerdelay {
        0%,
        40%,
        100% {
            transform: scaleY(0.4);
            -webkit-transform: scaleY(0.4);
        }
        20% {
            transform: scaleY(1);
            -webkit-transform: scaleY(1);
        }
    }
</style>

<div class="spinner">
    <div class="rect1" />
    <div class="rect2" />
    <div class="rect3" />
    <div class="rect4" />
    <div class="rect5" />
</div>
