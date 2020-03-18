const {OK} = require('../../utils/package');
const MediaRevenueDailyModel = require('../../modules/media/mediaRevenueDaily');
const UserModel = require('../../modules/user');
const {guid} =  require("../../utils/common");
// 文件上传相关
const fs = require('fs');
const {uploadExcel} = require('../../plugin/upload/upload');

class MediaRevenueDailyController {
    /**
     * 导入媒体收益
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let file = ctx.request.files.file;
        let media_id = ctx.request.body.media_id;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            try{
                // 导入媒体收益
                const fileData = await uploadExcel(file);

                // 只取总数据
                const total_revenue = fileData[0];

                const user_id = userInfo.id;
                // params
                const params = total_revenue.map((revenue) => {
                    return {
                        id: guid(),
                        time: revenue['日期'],
                        media_id,
                        user_id,
                        exposure: revenue['曝光量'],
                        clicks: revenue['点击量'],
                        click_rate: revenue['点击率'],
                        cpc: revenue['CPC'],
                        cpm: revenue['CPM'],
                        ip_traffic: revenue['IP访问量'],


                        ad_access_pv: revenue['广告位访问pv'],
                        ad_access_uv: revenue['广告位访问uv'],
                        earnings_per_uv: revenue['每UV收益'],
                        new_visitors_uv: revenue['新客访问量(UV)'],

                        estimated_revenue: revenue['预计收益'],
                        estimated_revenue_hz: revenue['杭州预计收益'],
                        estimated_revenue_hegs: revenue['霍尔果斯预计收益'],
                        estimated_revenue_hcyj: revenue['霍城兑捷预计收益']
                    }
                })
                // OK(ctx, 200, '媒体收益数据导入成功！', await MediaRevenueDailyModel.update(params));return
                const data = await MediaRevenueDailyModel.update(params);
                OK(ctx, 200, '媒体收益数据导入成功！', data);
            }catch(err){
                OK(ctx, 300, '媒体收益数据导入失败，请稍后重试', err);
            }
        }else {
            OK(ctx, 401, '信息已过期，请重新登录！', null);
        }
    }
    static async list(ctx){
        let headers = ctx.request.headers;
        let media_id = ctx.request.body.media_id;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            const data = await MediaRevenueDailyModel.list(media_id);
            OK(ctx, 200, '媒体收益数据查询成功！', data);
        } else {
            OK(ctx, 401, '信息已过期，请重新登录！', null);
        }
    }
    static async listAll(ctx){
        let headers = ctx.request.headers;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            const data = await MediaRevenueDailyModel.listAll();
            OK(ctx, 200, '媒体收益数据查询成功！', data);
        } else {
            OK(ctx, 401, '信息已过期，请重新登录！', null);
        }
    }
    static async search(ctx){
        let id = ctx.request.body.id || "";
        const data = await MediaRevenueDailyModel.search(id);
        OK(ctx, 200, '媒体收益数据查询成功！', data);
    }

}

module.exports = MediaRevenueDailyController;