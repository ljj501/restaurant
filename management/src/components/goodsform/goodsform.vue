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

      <el-form-item label="菜品编号" prop="number" class='z-name'>
            <el-input :value="ruleForm.number" disabled></el-input>
      </el-form-item>

      <el-form-item label="菜品价格" prop="price" class='z-name'>
            <el-input v-model="ruleForm.price" type='number'></el-input>
      </el-form-item>

      <el-form-item label="烹饪时长" prop="time" class='z-name'>
            <el-input v-model="ruleForm.time" type='number'></el-input>
      </el-form-item>
      
      <el-form-item label="菜品图片" prop="picture" class='z-name'>
          <el-upload
            class="upload-demo"
            action="http://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success='handleFiles'
            list-type="picture">
            <el-button size="small" type="primary">上传图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
      </el-form-item>
      <el-form-item label="创建时间" prop="creatDate" required>
        <el-col :span="8">
          <el-form-item prop="creatDate">
            <el-date-picker type="date" placeholder="创建时间" v-model="ruleForm.creatDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="上架" prop="status">
        <el-switch v-model="ruleForm.status"></el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    <loading v-show="loadingShow"></loading>
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
        dishClass:[]
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
                document.querySelector('.el-upload-list').remove();
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
      handleRemove(file, filelist) {
         console.log(file);
         console.log(filelist);
      },
      handlePreview(file) {
         console.log(file);
      },
      handleFiles(file, filelist) {
         this.ruleForm.picture = filelist.url;
      },
      goBack(){
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