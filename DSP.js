/**
 * 關於 數位訊號處理
 */


/**
 * FIR Filter design
 * FIR 濾波器設計
 */
class Windowing {
    constructor(M) {
        this.M = M
        this.α = M / 2;
    }
    Rectangular = n => n >= 0 && n <= this.M ? 1 : 0;
    Bartlett = n => n >= 0 && n <= this.α ? 2*n/this.M : n<this.α && n<=this.M ? 2-2*n/this.M : 0;
    Hanning = n => n >= 0 && n <= this.M ? 0.5-0.5*Math.cos(2*Math.PI*n/this.M) : 0;
    Hamming = n => n >= 0 && n <= this.M ? 0.54-0.46*Math.cos(2*Math.PI*n/this.M) : 0;
    Blackman = n => n >= 0 && n <= this.M ? 0.45-0.5*Math.cos(2*Math.PI*n/this.M)+0.8*Math.cos(4*Math.PI*n/this.M) : 0;
}

class KaiserWindow {
    constructor(ωs, ωp, δ1, δ2) {
        this.ωs = ωs;
        this.ωp = ωp;
        this.δ1 = δ1;
        this.δ2 = δ2;
        this.δ = δ1 <= δ2 ? δ1 : δ2;
        this.Δω = ωs - ωp;
        this.A = -20*Math.log10(this.δ);
        this.M = (this.A-8)/(2.285*this.Δω);
        this.α = this.M / 2;
        this.β = this.A > 50 ? 0.1102*(this.A-8.7) : this.A >= 21 && this.A <= 50 ? 0.5842*(this.A-21)**0.4+0.07886*(this.A-21) : this.A < 21 ? 0 : undefined;
        this.w = (I0, n) => n >= 0 && n <= this.M ? I0*(this.β*(1-((n-this.α)/this.α)**2)**(1/2))/(I0*this.β) : 0;
    }
    lowpassFilter(I0) {
        let ωc = (this.ωp - this.ωs) / 2;
        let impulseResponse = n => n >= 0 && n <= this.M ? new Filter(this.M, ωc).idealLinearPhaseLowpassFilter(n) * this.w(I0, n) : 0;
        return impulseResponse;
    }
    highpassFilter(I0) {
        let ωc = (this.ωs - this.ωp) / 2;
        let impulseResponse = n => 0 && n <= this.M ? new Filter(this.M, ωc).idealLinearPhaseHighpassFilter(n) * this.w(I0, n) : 0;
        return impulseResponse;
    }
}

class Filter {
    constructor(M, ωc) {
        this.M = M;
        this.α = M / 2;
        this.ωc = ωc;
    }
    idealLinearPhaseLowpassFilter = n => Math.sin(this.ωc*(n-this.α))/(Math.PI*(n-this.α));
    idealLinearPhaseHighpassFilter = n => Math.sin(Math.PI*(n-this.α))/(Math.PI*(n-this.α)) - Math.sin(this.ωc*(n-this.α))/(Math.PI*(n-this.α));
}

// Use
let w = new KaiserWindow(0.6*Math.PI, 0.4*Math.PI, 0.02, 0.001);
let impulseResponse = w.lowpassFilter(1);
console.log(w)
console.log(impulseResponse(1));