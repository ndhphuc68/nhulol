<template>
    <section id="banner">
        <div class="image">
            <img src="../../../../../assets/G2casino/banner/banner-home.png" alt="banner"/>
            <div class="overlay" />
        </div>
        <div class="description">
            <div class="title">{{ $t('titleBanner1') }} <span>200%</span> {{ $t('titleBanner2') }}</div>
            <div class="wrap-button">
                <RouterLink to="/signup" class="signup">{{ $t('signupNow') }}</RouterLink>
                <RouterLink to="/" class="discover">{{ $t('discoverNow') }}</RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
#banner {
    position: relative;
    .image {
        position: relative;
        top: 0;
        z-index: 0;
        img {
            width: 100%;
        }
        
        .overlay {
            background: rgba(0,0,0,0.5);
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
        }
    }

    .description {
        position: absolute;
        z-index: 1;
        width: 100%;
        top: 25%;

        .title {
            width: 1200px;
            margin: 0 auto;
            color: #FFF;
            text-align: center;
            font-size: 60px;
            font-weight: 700;
            text-transform: uppercase;
            line-height: 70px;
            letter-spacing: -4px;

            span {
                color: #254EE0;
            }
        }

        .wrap-button {
            margin-top: 50px;
            a {
                padding: 12px 24px;
                font-size: 16px;
                font-weight: 700;
                border: none;
                text-decoration: none;
                background: #fff;
                color: #000;
            }

            .signup {
                margin-right: 24px;
                background: #254EE0;
                color: #fff;
            }
        }
    }

    @media (max-width: 1200px) {
        .description {
            .title {
                width: 700px;
                font-size: 40px;
                line-height: 42px;
            }

            .wrap-button {
                margin-top: 30px;
                a {
                    padding: 8px 16px;
                    font-size: 14px;
                }
            }
        }
    }

    @media (max-width: 768px) {
        .description {
            .title {
                width: 500px;
                font-size: 24px;
                line-height: 24px;
                letter-spacing: -1px;
            }

            .wrap-button {
                margin-top: 20px;
                a {
                    padding: 4px 8px;
                    font-size: 12px;
                }
            }

            .signup {
                margin-right: 12px !important;
            }
        }
    }

    @media (max-width: 580px) {
        .description {
            .title {
                width: 320px;
                font-size: 16px;
                line-height: 18px;
                letter-spacing: 0px;
            }

            .wrap-button {
                margin-top: 10px;
                button {
                    padding: 4px 8px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>