<template>
	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">

      <el-form-item label="菜品名称" prop="name" class='z-name'>
            <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>

      <el-form-item label="菜品品类" prop="classify" class='z-classify'>
        <el-select v-model="ruleForm.classify" placeholder="">
            <el-option v-for="val in dishClass" :label="val.classify" :value="val.classify" ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜品编号" prop="number" class='z-price'>
            <el-input :value="ruleForm.number" disabled></el-input>
      </el-form-item>

      <el-form-item label="菜品价格" prop="price" class='z-price'>
            <el-input v-model="ruleForm.price" type='number'></el-input>
      </el-form-item>

      <el-form-item label="烹饪时长" prop="time" class='z-price'>
            <el-input v-model="ruleForm.time" type='number'></el-input>
      </el-form-item>

          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>

      <el-form-item label="创建时间" prop="creatDate" required  class='z-classify'>
        <el-col :span="8">
          <el-form-item prop="creatDate">
            <el-date-picker type="date" placeholder="创建时间" v-model="ruleForm.creatDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item label="上架" prop="status"  class='z-name'>
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>

      <el-form-item  class='z-btn'>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>

    <!-- <loading v-show="loadingShow"></loading> -->
    </el-form>

</template>

<script>
    import './goodsform.scss'
    import router from '../../router/'
    import loading from '../loading/loading.vue'
    import http from '../../utils/httpClient.js'
  export default {
    data() {
      return {
        ruleForm: {
          name: '',
          claasify: '',
          number:'',
          creatDate: (new Date()).toLocaleDateString().split('/').join('-'),
          price: '',
          time:'',
          status:true,
          picture:''
        },
        rules: {
          name: [
            { required: true, message: '名称不能为空', trigger: 'blur' }
          ],
          classify: [
            { required: true, message: '品类不能为空', trigger: 'change' }
          ],
          date: [
            { type: 'date', required: true, message: '时间不能为空', trigger: 'change' }
          ],
          price: [
            { required: true, message: '价格不能为空',  trigger: 'blur' }
          ],
          time: [
            {required: true, message: '烹饪时长不能为空',  trigger: 'blur' }
          ]
        },
        dishClass:[],
        imageUrl:''
      };
    },
    watch:{
        'ruleForm.classify':function(){
            this.autoNumber(this.ruleForm.classify);
        }
    },
    mounted:function(){
        var opts = {
                url: 'getDishClass',
                vm:this,
                loading:'loadingShow'
            }
        this.showData(opts);
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            //this.ruleForm.picture = this.$children[0].$children[5].$children[0].$children[1].files[0].url;
            this.ruleForm.status ? this.ruleForm.status ='正在卖' : this.ruleForm.status ='已下架' ;
            var self = this;
            var opts = {
                url: 'addDish',
                vm:this,
                loading:'loadingShow',
                params:this.ruleForm
            }
            http.post(opts).then(res => {
                self.$refs[formName].resetFields();
                self.imageUrl = '';
                self.$message({
                      message: '添加菜品成功',
                      type: 'success'
                    });
            })
            
          } else {
            return false;
          }
        });
      },
      handleAvatarSuccess(res, file) {
              this.imageUrl = URL.createObjectURL(file.raw);
              this.ruleForm.picture = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      goBack:function(){
          this.$store.state.show = true;
          router.push('/goodslist');
      },
      showData:function(opts){
          var self = this;
          http.post(opts).then(res => {
              self.dishClass = res.data;
          })
      },
      autoNumber:function(dishClass){
          var self = this;
          var opts = {
              url: 'getDishNumber',
              vm:this,
              loading:'loadingShow',
              params:{
                  classify:dishClass
              }
          }
        http.post(opts).then(res => {
            if(res.data.length>0){
                self.ruleForm.number =('0' + (res.data[0].number*1 + 1)).slice(-6,6);
            }else{
                self.ruleForm.number = '';
            }
        })
      }
    }
  } 
</script>