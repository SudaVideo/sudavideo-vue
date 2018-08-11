<template>
    <div>
        <el-row type="flex" justify="center">
            <el-col :sm="8" :xs="24">
                <div style="text-align: center">

                    <h1>免责声明</h1>

                    <p style="color: red;">
                        <b>{{siteName}}提醒您：在浏览{{siteName}}前，请您务必仔细阅读并透彻理解本声明。您可以选择不浏览本网站，但如果您浏览{{siteName}}，您的行为将被视为对本声明全部内容的认可。</b>
                    </p>

                    <p>
                        {{siteName}}不提供任何视听上传服务，所有内容均来自视频分享站点所提供的公开引用资源，所有视频及图文版权均归原作者及其网站所有。本站将竭尽所能注明资源来源，但由于互联网转载的不可预性，无法确认所有内容的版权所有人。若原作者对本站所载视频作品版权的归属存有异议，请联系{{contactEmail}}，我们将在第一时间予以删除。
                    </p>
                    <p>
                        任何存在于{{siteName}}上的视频、图文资料均从网络收集所得，不代表{{siteName}}网站立场。您可能从这些视频、图文资料上获得资讯，{{siteName}}对其合法性概不负责，亦不承担任何法律责任。
                    </p>

                    <p>
                        您应该对浏览使用{{siteName}}一切服务自行承担风险。我们不做任何形式的保证：不保证站内搜索结果满足您的要求，不保证网站服务不中断，不保证视频及图文资源的安全性、正确性、及时性、合法性。因网络状况、通讯线路、第三方网站等任何原因而导致您不能正常使用{{siteName}}，{{siteName}}不承担任何法律责任。
                    </p>

                    <p>
                        任何单位或个人认为通过{{siteName}}提供的内容可能涉嫌侵犯其信息网络传播权，应该及时向{{siteName}}提出书面权利通知，并提供身份证明、权属证明及详细侵权情况证明。{{siteName}}在收到上述法律文件后，将会依法尽快断开相关链接内容。
                    </p>

                    <p>
                        {{siteName}}一切资源仅为学习交流娱乐所用，请在下载后24小时内删除，未经版权许可，任何单位或个人不得将本站内容或服务用于商业目的。
                    </p>
                </div>

            </el-col>
        </el-row>

    </div>
</template>

<script>

    import VideoApi from '@/api/VideoApi';

    export default {
        data() {
            return {
                siteName: '',
                contactEmail: ''
            }
        },
        mounted() {
            VideoApi.getSiteInfo().then(res => {
                if (res) {
                    this.siteName = res.siteName;
                    this.contactEmail = res.contactEmail;
                }
            })
        }
    }

</script>

<style scoped lang="scss">


</style>
