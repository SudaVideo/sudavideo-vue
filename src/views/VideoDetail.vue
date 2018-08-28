<template>

    <div>
        <ball v-if="ballShow" style="top: 0;"></ball>


        <el-main v-if="videoDetail!=null">
            <el-row :gutter="0" style="text-align: center" type="flex" justify="center">
                <el-col :sm="12" :xs="24" id="detailContainer">
                    <div v-loading="!startPlay">
                        <iframe v-if="useFrame" style="width: 100%;margin: 0"
                                allowfullscreen="true" allowtransparency="true"
                                v-bind:style="{ height: frameHeight + 'px' }"
                                :src="playUrl"
                                frameborder="0">
                        </iframe>
                        <d-player v-bind:class="{ videoInit: !startPlay && ballShow}" v-if="!useFrame"
                                  :options="options"
                                  @play="play"
                                  @loadedmetadata="loadedmetadata"
                                  @error="playerror"
                                  ref="player">
                        </d-player>
                    </div>

                    <br>
                    <el-row :gutter="0">
                        <el-col v-for="video in videoDetail.videoSeries" :sm="colSize" :xs="colSize"
                                :key="video.seriesId">
                            <el-button style="margin: 2px" v-bind:key="video.seriesId"
                                       :type="seriesId==video.seriesId ?'primary':''"
                                       round
                                       size="small"
                                       @click="goPlay(video.seriesId)">{{video.name}}
                            </el-button>
                        </el-col>
                    </el-row>


                    <br>
                    <h5 style="margin: 0;line-height: normal"> {{videoDetail.desc}}</h5>
                    <br>

                    <img v-bind:key="imgUrl" style="width: 100%"
                         v-for="imgUrl in videoDetail.previewImgs"
                         :src="imgUrl"/>
                </el-col>
            </el-row>
        </el-main>

    </div>
</template>

<script>

    import VideoApi from '@/api/VideoApi'
    import ball from '../components/ball'

    export default {
        components: {
            ball
        },
        props: {
            source: 0,
            videoId: "",
            seriesId: "",
        },
        data() {
            return {
                ballShow: false,
                videoDetail: {},
                playUrl: "",
                loading: true,
                showVideo: false,
                useFrame: false,
                colSize: 6,
                frameHeight: 0,
                startPlay: false,
                options: {
                    video: {
                        type: 'auto'
                    },
                    theme: '#409EFF',
                    lang: 'zh-cn',
                    autoplay: true,
                    contextmenu: [
                        {
                            text: 'ghbhaha',
                            link: 'https://github.com/ghbhaha'
                        }
                    ]
                },
                player: null
            };
        },
        methods: {
            goPlay(seriesId) {
                this.$router.replace("/videoDetail/" + this.source + "/" + this.videoId + "/" + seriesId);
                window.location.reload();
            },
            getPlayUrl(seriesId) {
                this.showVideo = false;
                VideoApi.getVideoPlayUrl(this.videoId, seriesId, this.source).then(
                    url => {
                        //console.log(url)
                        if (url) {
                            if (url.endsWith("html") || url.indexOf("php") > 0) {
                                this.useFrame = true;
                                this.playUrl = url;
                                this.startPlay = true;
                            } else {
                                this.useFrame = false
                                this.player.switchVideo({
                                    url: url
                                });
                            }
                            this.showVideo = true;
                        } else {
                            this.$message.error("获取播放链接失败,请刷新或者切换源");
                        }
                    }
                );
            },
            play() {
            },
            loadedmetadata() {
                this.startPlay = true;
            },
            playerror() {
                this.$message.error('视频加载出错');
            },
            adjustHeight() {
                this.frameHeight = document.getElementById('detailContainer').clientWidth / 16 * 9;
            },
            queryVideoDetail() {
                VideoApi.getVideoDetail(this.videoId, this.source).then(
                    res => {
                        if (res != null) {
                            this.videoDetail = res;
                            console.log(this.seriesId)
                            if (this.seriesId) {
                                this.getPlayUrl(this.seriesId)
                            } else {
                                if (res.videoSeries != null && res.videoSeries.length > 0) {
                                    this.seriesId = res.videoSeries[0].seriesId;
                                    this.getPlayUrl(this.seriesId)
                                }
                            }
                        }
                    }
                )
            }
        },
        mounted() {
            var ua = navigator.userAgent.toLowerCase();
            if (/iphone|ipod/.test(ua)) {
                // console.log('apple');
                this.ballShow = true
            } else if (/android/.test(ua)) {
                // console.log('android');
                this.ballShow = true
            }

            this.player = this.$refs.player.dp
            this.adjustHeight();
            document.title = window.localStorage.getItem("current_title");
        },
        created() {
            this.queryVideoDetail();
        }
    }
</script>

<style scoped lang="scss">
    .el-main {
        text-align: center;
        line-height: normal;
        padding: 0;
        margin: 1vw;
    }

    .videoInit {
        height: 53vw;
    }

    .dplayer-comment-icon {
        display: none;
        height: 0%;
    }
</style>

