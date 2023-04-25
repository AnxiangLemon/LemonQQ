// 本地数据库的增删改查 
// 由于转换原因 所有key value 都是string类型
class MyLeveldb {
    put(key, value) {
        return MyDB_Put(key, value)
    }

    get(key) {
        return MyDB_Get(key)
    }

    delete(key) {
        return MyDB_Delete(key)
    }

    has(key) {
        return MyDB_Has(key)
    }
}

module.exports = new MyLeveldb();