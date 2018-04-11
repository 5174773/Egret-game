class ObjPool<T>
{
        private m_pool: T[] = new Array();

        hasObjcet(): boolean {
                if (this.m_pool != null && this.m_pool.length > 0) {
                        return true;
                }
                return false;
        }
        // 分配对象
        AllcoObj(ctor: { new (): T }): T {
                if (this.m_pool == null || this.m_pool.length == 0) {
                        var obj: T = new ctor();
                        return obj;
                }
                return this.m_pool.shift();
        }

        // 回收对象
        public Free(obj: T): void {
                this.m_pool.push(obj);
        }

        // 清空对象
        public Clear() {
                this.m_pool.splice(0);
        }
}