module.exports = `
<template>
        <div>
            <el-form-item :label="formOne.label" :prop='formOne.key'>
                    <el-input v-model="params[formOne.key]" :placeholder="formOne.placeholder || '请输入内容'" v-if="!formOne.type" size='small'></el-input>
                    <el-input v-model="params[formOne.key]" :placeholder="formOne.placeholder || '请输入内容'" v-if="formOne.type == 'txt'" size='small'></el-input>
                    <el-select v-model="params[formOne.key]" :value-key='formOne.valueKey' @change='(item) => {changeHandler(item, formOne)}' :placeholder="formOne.placeholder || '请选择内容'" v-if="formOne.type == 'select'"  size='small'>
                        <el-option
                          v-for="item in formOne.options"
                          :key="item[formOne.keyName || 'value']"
                          :label="item[formOne.labelName || 'label']"
                          :value="formOne.Object?item:item[formOne.keyName || 'value']">
                        </el-option>
                    </el-select>
                    <el-date-picker
                        style='width: 100%'
                        :placeholder="formOne.placeholder  || '请选择日期'" 
                        v-if="formOne.type == 'dateRange'"  
                        size='small'
                        value-format='yyyy-MM-dd'
                        v-model="dateValue"
                        @change = 'dateChangeHandler'
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-date-picker
                        v-model="params[formOne.key]"
                        v-if="formOne.type == 'date'"  
                        value-format='yyyy-MM-dd'
                        type="date"
                        placeholder="选择日期">
                    </el-date-picker>
                    <span style='display: none;'>{{formOne.t}}</span>
            </el-form-item>
        </div>
    </template>
    
    <script>
        export default {
            props: {
                formOne: {
                    default: function() {return {}},
                    type: Object
                },
                params: {
                    default: function() {return {}},
                    type: Object
                }
            },
            name: 'search-sprite',
            data: function () {
                return {
                    dateValue: '' // 日期范围的值
                }
            },
            mounted() {
                if(this.formOne.type == 'dateRange') {
                    // 监测默认params
                    let start = this.params[this.formOne.key[0]];
                    let end = this.params[this.formOne.key[1]];
                    this.dateValue = [start, end];
                }
            },
            methods: {
                dateChangeHandler(dates) {
                    this.params[this.formOne.key[0]] = dates[0];
                    this.params[this.formOne.key[1]] = dates[1];
                },
                changeHandler(item, formOne) {
                    this.$emit("changeAction", item, formOne);
                }
            },
        };
    </script>
`