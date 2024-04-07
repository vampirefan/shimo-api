import * as GC from '@grapecity/spread-sheets'
import * as spreadExcel from '@grapecity/spread-excelio'
import { ElMessage } from 'element-plus'
import { saveAs } from 'file-saver'

export const actionHandlers: { [key: string]: ({ workbook, options }) => void } = {
  autoFitColumns,
  autoFitRows,
  getArray,
  getDataSource,
  getExcel,
  loadExcel,
  loadSSJson,
  postExcel,
  saveExcel,
  setArray,
  setDataSource,
  setSheetOptions,
}

/**
 * 工具方法 - 将指令结果返回给父页面
 * @param messageData 给父页面发送的数据对象
 */
function postMessageToParent(messageData: Record<string, any>) {
  window.parent.postMessage(messageData, '*')
}

/**
 * 从网络地址导入 Excel 文件
 * - workbook: GC.Spread.Sheets.Workbook 实例
 * - options
 *   - fileUrl 文件的下载地址
 *   - fileBuffer 文件的 ArrayBuffer() 数据
 */
export async function loadExcel({ workbook, options }) {
  const { fileUrl, fileBuffer } = options
  if (fileUrl) {
    const fileBlob = await $api<any>('/fetchFile', { method: 'post', body: { fileUrl } })
    const excelIO = new spreadExcel.IO()
    excelIO.open(fileBlob, (json: any) => {
      workbook.fromJSON(json, {
        incrementalLoading: true,
      })
      postMessageToParent({
        action: 'loadExcel',
        complete: true,
      })
    })
  }
  else if (fileBuffer) {
    const excelIO = new spreadExcel.IO()
    excelIO.open(fileBuffer, (json: any) => {
      workbook.fromJSON(json, {
        incrementalLoading: true,
      })
      postMessageToParent({
        action: 'loadExcel',
        complete: true,
      })
    })
  }
}

/**
 * 从网络地址导入 ssjson 模板文件
 * - workbook GC.Spread.Sheets.Workbook 实例
 * - options
 *   - fileUrl 文件的下载地址
 *   - fileBuffer 文件的 ArrayBuffer() 数据
 */
export async function loadSSJson({ workbook, options }) {
  const { fileUrl, fileBuffer } = options
  if (fileUrl) {
    const fileBlob = await $api<any>('/fetchFile', { method: 'post', body: { fileUrl } })
    const ssjson = await fileBlob.text()
    workbook.fromJSON(JSON.parse(ssjson))
    postMessageToParent({
      action: 'loadSSJson',
      complete: true,
    })
  }
  else if (fileBuffer) {
    const ssjson = new TextDecoder().decode(new Uint8Array(fileBuffer))
    workbook.fromJSON(JSON.parse(ssjson))
    postMessageToParent({
      action: 'loadSSJson',
      complete: true,
    })
  }
}

/**
 * 设置表格数据（需配合导入 ssjson 模板后使用）
 * - workbook GC.Spread.Sheets.Workbook 实例
 * - options
 *   - data 表格的 json 格式数据
 *   - tableName 表格名称，默认为 'gcTable0'
 *   - expandBoundRows 是否允许扩展边界行，默认为 true
 */
export async function setDataSource({ workbook, options }) {
  const { data, tableName = 'gcTable0', expandBoundRows = true } = options
  const source = new GC.Spread.Sheets.Bindings.CellBindingSource(data)
  const sheet = workbook.getActiveSheet()
  // 设置数据时暂停绘制
  sheet.suspendPaint()
  const table = sheet.tables.findByName(tableName)
  if (table)
    table.expandBoundRows(expandBoundRows)
  sheet.setDataSource(source)
  sheet.resumePaint()
  postMessageToParent({
    action: 'setDataSource',
    complete: true,
  })
}

/**
 * 获取表格数据源（需配合导入 ssjson 模板后使用）
 * - workbook GC.Spread.Sheets.Workbook 实例
 */
export async function getDataSource({ workbook }) {
  const sheet = workbook.getActiveSheet()
  postMessageToParent({
    action: 'getDataSource',
    complete: true,
    data: sheet.getDataSource(),
  })
}

/**
 * 将当前表单 Excel 文件发送给网络地址
 * - options
 *   - postUrl: 需要将 Excel 文件上传给后端文件服务的 api 地址
 *   - postOptions:
 *   - saveOptions 保存参数 { password: '', xlsxStrictMode: false }
 */
export function postExcel({ workbook, options }) {
  const { postUrl, fileName = '表单数据.xlsx', saveOptions = {} } = options
  const excelIO = new spreadExcel.IO()
  const json = JSON.stringify(
    workbook.toJSON({
      includeBindingSource: true,
      saveAsView: true,
    }),
  )
  excelIO.save(
    json,
    async (fileBlob: Blob) => {
      const formData = new FormData()
      formData.append('file', fileBlob, fileName)
      formData.append('postUrl', postUrl)
      const response = await $api<any>('/postFile', { method: 'post', body: formData })
      postMessageToParent({
        action: 'postExcel',
        complete: true,
        data: response,
      })
    },
    (error: any) => {
      ElMessage.error(error)
    },
    saveOptions,
  )
}

/**
 * 获取 Excel 文件的 FileBlob
 * - options
 *   - saveOptions 保存参数 { password: '', xlsxStrictMode: false }
 */
export function getExcel({ workbook, options }) {
  const { saveOptions = {} } = options
  const excelIO = new spreadExcel.IO()
  const json = JSON.stringify(
    workbook.toJSON({
      includeBindingSource: true,
      saveAsView: true,
    }),
  )
  excelIO.save(
    json,
    (fileBlob: Blob) => {
      postMessageToParent({
        action: 'getExcel',
        complete: true,
        data: fileBlob,
      })
    },
    (error: any) => {
      ElMessage.error(error)
    },
    saveOptions,
  )
}

/**
 * Excel 文件下载
 * - workbook GC.Spread.Sheets.Workbook 实例
 * - options
 *   - fileName 保存的文件名称
 *   - saveOptions 保存参数 { password: '', xlsxStrictMode: false }
 */
export function saveExcel({ workbook, options }) {
  const { fileName = '表单数据', saveOptions = {} } = options
  const excelIO = new spreadExcel.IO()
  const json = JSON.stringify(
    workbook.toJSON({
      includeBindingSource: true,
      saveAsView: true,
    }),
  )
  excelIO.save(
    json,
    (fileBlob: Blob) => {
      saveAs(fileBlob, fileName)
    },
    (error: any) => {
      ElMessage.error(error)
    },
    saveOptions,
  )
}

/**
 * 以数组形式在表中设置数据
 * - workbook GC.Spread.Sheets.Workbook 实例
 * - options 设置参数
 *   - row 行索引，默认值 0
 *   - column 列索引，默认值 0
 *   - array 设置值的数组，默认值 []
 *   - setFormula 是否为公式，默认值 false
 */
export function setArray({ workbook, options }) {
  const sheetObj = workbook.getActiveSheet()
  const { row = 0, column = 0, array = [], setFormula = false } = options
  sheetObj.setArray(row, column, array, setFormula)
  postMessageToParent({
    action: 'setArray',
    complete: true,
  })
}

/**
 * 以数组形式获取表中数据
 * - workbook GC.Spread.Sheets.Workbook 实例
 * - options 获取参数
 *   - row 行索引，默认值 0
 *   - column 列索引，默认值 0
 *   - rowCount 获取行数，默认值全部行
 *   - columnCount 获取列数，默认值全部列
 *   - getFormula 是否为公式，默认值 false
 */
export function getArray({ workbook, options }) {
  const sheetObj = workbook.getActiveSheet()
  let { row = 0, column = 0, rowCount = 0, columnCount = 0, getFormula = false } = options
  rowCount = rowCount || sheetObj.getRowCount()
  columnCount = columnCount || sheetObj.getColumnCount()
  const result = sheetObj.getArray(row, column, rowCount, columnCount, getFormula)
  postMessageToParent({
    action: 'getArray',
    complete: true,
    data: result,
  })
}

/**
 * 设置表单页面参数，如只读、是否显示行列标题等
 * - options 表单页面参数
 */
export function setSheetOptions({ workbook, options }) {
  const sheetObj = workbook.getActiveSheet()
  for (const key in options)
    sheetObj.options[key] = options[key]
  postMessageToParent({
    action: 'setSheetOptions',
    complete: true,
  })
}

/**
 * 让表格自动合适视图行
 * - options
 *   - start 起始行索引，默认为 0
 *   - length 行数，默认为所有行
 */
export function autoFitRows({ workbook, options }) {
  const sheetObj = workbook.getActiveSheet()
  let { start, length } = options
  start = start || 0
  length = length || sheetObj.getRowCount()
  // 设置数据时暂停绘制
  sheetObj.suspendPaint()
  for (let i = start; i <= start + length; i++)
    sheetObj.autoFitRow(i)
  sheetObj.resumePaint()
  postMessageToParent({
    action: 'autoFitRows',
    complete: true,
  })
}

/**
 * 让表格自动合适视图列
 * - options
 *   - start 起始列索引，默认为 0
 *   - length 列数，默认为所有列
 */
export function autoFitColumns({ workbook, options }) {
  const sheetObj = workbook.getActiveSheet()
  let { start, length } = options
  start = start || 0
  length = length || sheetObj.getColumnCount()
  // 设置数据时暂停绘制
  sheetObj.suspendPaint()
  for (let i = start; i <= start + length; i++)
    sheetObj.autoFitColumn(i)
  sheetObj.resumePaint()
  postMessageToParent({
    action: 'autoFitColumns',
    complete: true,
  })
}
