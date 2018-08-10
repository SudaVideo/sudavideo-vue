<template>
    <div class="hello">
        <el-container>
            <el-main style="overflow: hidden;padding-bottom: 10px">
                <el-row :gutter="3" v-if="!loading">

                    <div v-if="videos.length==0" class="empty">
                        <h1>已经到头了</h1>
                    </div>

                    <el-col v-for="video in videos" :xs="source==4 ?12: 8" :sm="4" :lg="2" :key="video.videoId"
                            style="margin-bottom: 0.3vw">
                        <el-card :body-style="{ padding: '0px' }">
                            <!-- 动漫图片特殊处理 -->
                            <img v-lazy="video.thumb" class="image"
                                 v-bind:class="{
                                 imageCartoonXs: source==4 && screenWidth<768,
                                 imageCartoonSm: source==4 && screenWidth>=768  && screenWidth< 1200,
                                 imageCartoonLg: source==4 && screenWidth>=1200
                                 }"
                                 @click="goDetail(video)">
                            <div style="padding: 4px;">
                                <span class="title">{{video.title}}</span>
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
                <div class="loadingContent" v-if="loading" v-loading="loading">
                </div>
            </el-main>
            <el-footer>
                <el-pagination @current-change="handleChange"
                               background
                               small
                               pager-count="5"
                               layout="prev,pager, next"
                               :page-count=pageSize>
                </el-pagination>
            </el-footer>
        </el-container>
    </div>
</template>

<script>

    import VideoApi from '@/api/VideoApi'

    export default {
        props: {
            playType: "",
            source: 0
        },
        data() {
            return {
                videos: [],
                loading: true,
                pageSize: 0,
                screenWidth: document.body.clientWidth
            };
        },
        methods: {
            getVideo(page) {
                this.loading = true;
                VideoApi.getVideosByType(this.playType, this.source, page).then(res => {
                    this.videos = res.data;
                    this.loading = false;
                    this.pageSize = res.pageSize;
                });
            },
            goDetail(video) {
                window.localStorage.setItem("current_title", video.title);
                this.$router.push("/videoDetail/" + video.source + "/" + video.videoId)
            },
            handleChange(value) {
                this.getVideo(value);
            }
        },
        mounted() {
            this.getVideo(1);
            window.onresize = () => {
                return (() => {
                    this.screenWidth = document.body.clientWidth
                })()
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

    .el-footer {
        text-align: center;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: normal;
        padding: 0;
    }

    body > .el-container {
        margin-bottom: 40px;
    }

    .image {
        width: 100%;
        display: block;
        cursor: pointer
    }

    .imageCartoonXs {
        height: 20vw;
    }

    .imageCartoonSm {
        height: 10vw;
    }

    .imageCartoonLg {
        height: 5vw;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }

    .clearfix:after {
        clear: both
    }

    .title {
        display: block;
        overflow: hidden;
        -o-text-overflow: ellipsis;
        text-align: center;
        margin: 0;
        width: 100%;
        font-size: 12px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .loadingContent {
        width: 100%;
        min-height: 40vw
    }

    .empty {
        /*background-color: #E9EEF3;*/
        color: #333;
        text-align: center;
        line-height: 160px;
    }


</style>
