<template>
    <div class="home">

        <el-container>
            <el-main style="overflow: hidden">

                <el-tabs v-model="activeName" tab-position="left" @tab-click="handleClick">
                    <el-tab-pane v-for="(source,index) in sources"
                                 v-bind:key="index"
                                 :label=source.name
                                 lazy
                                 :name=source.name>
                        <video-list :playType=source.type :source=source.source></video-list>
                    </el-tab-pane>
                </el-tabs>

            </el-main>
            <el-footer>
                <h4>本站资源抓取自互联网，仅供学习交流使用<br>
                    <router-link style="color: red" to="/about/Disclaimer">免责声明</router-link>
                    <!--&nbsp;-->
                    <!--<a href="https://sudavideo.site/#/">新站点</a>-->
                    &nbsp;
                    <a href="https://github.com/sudavideo">源代码(交流学习)</a>
                </h4>
            </el-footer>
        </el-container>


        <transition name="el-fade-in">
            <el-button icon="el-icon-search" circle
                       @click="showSearchField()"
                       size="middle"
                       v-if="!showSearch"
                       class="searchBt"
            ></el-button>
        </transition>


        <el-collapse-transition>
            <el-autocomplete
                    v-if="showSearch"
                    class="searchBt searchField"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入内容"
                    @select="handleSelect">
                <i class="el-icon-close el-input__icon" slot="suffix" @click="showSearchField()"></i>
            </el-autocomplete>
        </el-collapse-transition>

    </div>

</template>

<script>

    import VideoList from '@/components/VideoList.vue';
    import VideoApi from '@/api/VideoApi';

    export default {
        components: {
            VideoList
        },
        data() {
            return {
                sources: [],
                activeName: 'film',
                searchVideos: [],
                showSearch: false
            };
        },
        props: {
            playType: '',
        },
        mounted() {
            VideoApi.getSources().then(res => {
                if (res) {
                    this.sources = res;
                    if (this.playType) {
                        this.activeName = this.playType;
                    } else {
                        this.activeName = res[0].name;
                    }
                }
            })
        },
        methods: {
            querySearchAsync(queryString, cb) {
                if (queryString) {
                    VideoApi.searchVideoByName(queryString).then(videos => {
                            this.searchVideos = videos;
                            this.searchVideos.forEach(function (value) {
                                value.value = value.title;
                            })
                            cb(this.searchVideos);
                        }
                    )
                }
            },
            handleSelect(item) {
                window.localStorage.setItem("current_title", item.title);
                this.$router.push("/videoDetail/" + item.source + "/" + item.videoId)
            },
            showSearchField() {
                this.showSearch = !this.showSearch;
            },
            handleClick(tab, event) {
                this.$router.replace("/" + tab.name);
                console.log(tab.name);
            }
        }, activated() {
            window.localStorage.removeItem("current_title")
            VideoApi.getSiteInfo().then(res => {
                if (res) {
                    document.title = res.siteName;
                }
            })
        }
    }
</script>

<style scoped lang="scss">

    .el-footer {
        text-align: center;
        margin-top: -20px;
        margin-bottom: 20px;
    }

    .el-main {
        /*background-color: #E9EEF3;*/
        text-align: center;
        line-height: normal;
        padding: 0;
        margin-top: 10px;
    }

    .searchBt {
        position: fixed;
        top: 4px;
        right: 0;
        margin-right: 20px
    }

    .searchField {
        width: 40%;
        display: block;
        z-index: 12
    }


</style>
