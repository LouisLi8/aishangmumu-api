const {OK} = require('../../utils/package');
const MediaRevenueAssembleModel = require('../../modules/media/mediaRevenueAssemble');
const UserModel = require('../../modules/user');
// 文件上传相关
const fs = require('fs');
const {uploadExcel} = require('../../plugin/upload/upload');

class MediaRevenueAssembleController {
    /**
     * 导入媒体收益
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx){
        //接收客户端
        let headers = ctx.request.headers;
        let file = ctx.request.files.file;
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
                        user_id,
                        time: revenue['日期'],
                        id: revenue['媒体ID'],
                        media_name: revenue['媒体名称'],
                        media_type: revenue['系统平台'],
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
                // OK(ctx, 200, '媒体收益数据导入成功！', params);return
                // OK(ctx, 200, '媒体收益数据导入成功！', await MediaRevenueAssembleModel.update(params));return
                const data = await MediaRevenueAssembleModel.update(params);
                OK(ctx, 200, '媒体收益数据导入成功！', data);
            }catch(err){
                OK(ctx, 300, '媒体收益数据导入失败，请稍后重试', err);
            }
        }else {
            OK(ctx, 401, '信息已过期，请重新登录！', req);
        }
    }
    static async list(ctx){
        let headers = ctx.request.headers;
        const userInfo = await UserModel.getUserDetailByToken(headers.token);
        if(userInfo){
            const data = await MediaRevenueAssembleModel.list(userInfo.id);
            OK(ctx, 200, '媒体收益数据查询成功！', data);
        } else {
            OK(ctx, 401, '信息已过期，请重新登录！', req);
        }
    }
    static async search(ctx){
        let id = ctx.request.body.id || "";
        const data = await MediaRevenueAssembleModel.search(id);
        OK(ctx, 200, '媒体收益数据查询成功！', data);
    }

}

module.exports = MediaRevenueAssembleController;