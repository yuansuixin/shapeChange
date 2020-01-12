//形变类
class Transform {
    constructor(selector) {
        this.el = document.querySelector(selector)
        this._queue = [];
        this._transform = {
            rotate: '',
            translage: '',
            scale: ''

        }
        this.defaultTime = Transform.config.defaultTime;
        this.el.style.transition = `all ${.3}s`;
    }
    //位移
    translate(value, time) {
        return this._add('translate', value, time)
    }

    //缩放
    scale(value, time) {
        return this._add('scale', value, time)
    }

    //形变
    rotate(value, time) {
        return this._add('rotate', value, time)
    }
    //添加动画
    _add(type, value, time=this.defaultTime) {
        this._queue.push({type, value, time})
        return this
    }

    //添加完成，可以开始动了
    done() {
        this._start();
    }

    _start() {
        if (!this._queue.length) return;

        setTimeout(() => {
            const info = this._queue.shift(); //
            this.el.style.transition = `all ${info.time/1000}s `
            this.el.style.transform = this._getTransform(info)
            console.log('this._getTransform(info)==',this._getTransform(info))

            console.log(' this.el.style.transform===0', this.el.style.transform)
            setTimeout(() => {
                this._start();
            }, info.time);
        }, 0);
    }

    _getTransform({ time, value, type }) {
        const _tsf = this._transform;

        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value}deg)`
                break;
            default:
                break;

        }
        return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`

    }


}

Transform.config = {
    defaultTime:300
}
Transform.config.defaultTime = 1000

  
class MultiTransform extends Transform{
    multi(value,time){
        return this._add('multi', value,time)
    }

    sleep(value){
        return this._add('sleep',value)
    }

    _getTransform({ time, value, type }) {
        const _tsf = this._transform;

        switch (type) {
            case 'translate':
                _tsf.translate = `translate(${value})`;
                break;
            case 'scale':
                _tsf.scale = `scale(${value})`
                break;
            case 'rotate':
                _tsf.rotate = `rotate(${value}deg)`
                break;
            case 'multi':
                value.forEach(item => {
                    this._getTransform(item)
                });
                break;
            default:
                break;

        }
        return `${_tsf.translate} ${_tsf.scale} ${_tsf.rotate}`

    }
}

const tf = new MultiTransform('.ball')
console.log('tf==',tf)
tf
    .translate('100px,100px')
    .scale(1.5)
    .sleep(1000)
    .rotate(180,5000)
    .multi([
        {
            type:'translate',
            value:'0,0'
        },
        {
            type:'scale',
            value:2
        }
    ])
    .done()
console.log(tf)



