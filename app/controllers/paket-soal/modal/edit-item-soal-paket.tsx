import {useCallback, useEffect, useMemo, useState} from 'react';
import { useFormEdura } from '~/components/form-custom/form-edura';
import { type JsonAlatJawabTupple, type BankSoalAppType } from '~/types/bank-soal/bank-soal-type';
import { FieldSet } from '~/components/ui/field';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import ContentTabSoal from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/conten-tab-soal';
import {type JSONContent } from '@tiptap/react';
import { HtmlRenderer } from '~/components/editor-tip-tap/renderer/HtmlRenderer';
import type { OpsiPilihanJawabanType } from '~/types/bank-soal/bentuk-soal/json-alat-jawab-type';
import type { FormatElemen } from '~/types/bank-soal/bentuk-soal-type';
import ContentTabOpsiJawab from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-opsi-jawab';
import { useAppSelector } from '~/context-reduct/hook';
import { OrmPromesInstanceSelector } from '~/context-reduct/selectores/orm-promes-selector';
import ContentTabIndikatorSoal from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-indikator-soal';
import { ListBentukSoal } from '~/domain/bank-soal/list-bentuk-soal';
import ContentTabKurikulum from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-kurikulum';
import { TaksonomiBloomInstance } from '~/context-reduct/selectores/taksonomi-selector';
import { TaksonomiMatcher } from '~/domain/taksonomi';
import ContentTabLevelSoal from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-level-soal';
import ContentTabPratinjauSoalModal from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-pratinjau';
import ContentTabPembahasan from '../../koleksi-bank-soal/modal/fieldset/modal-tabs/content-tab-pembahasan';
import { getSessionApp } from '~/infrastructures/session-storage/app-session';
import type { UserPtk } from '~/types';
import { ModalFooterEdura } from '~/components/modals/modal-components';
import { useCrudBankSoalProvider } from '~/controllers/bank-soal/cruds/crud-provider-bank-soal';
import { useModal } from '~/components/modals/modal-provider';
import SendEditSoalPaket from '../crud/send-edit-soal-paket';
import type { InitialItemSoalImplemented } from '~/controllers/paket-soal/modal/initial-item-soal-implemented';
import SendCopySoalPaket from '../crud/send-copy-soal-paket';
import SendSoalBaruPaket from '../crud/send-soal-baru-paket';
import ContentTabSoalPaket from '~/controllers/koleksi-bank-soal/modal/fieldset/modal-tabs/conten-tab-soal-paket';
import { useFilterContext } from '~/components/toolbars/state-toolbar/state-toolbar';
import {type PaketSoalDesign } from '~/domain/paket-soal/result/paket-soal';

export default function ModalEditItemSoalPaket({mode}:{mode?:string}){
    
    /**source of truth */
    const {value} = useFilterContext<PaketSoalDesign>()
    const Prota = useAppSelector(OrmPromesInstanceSelector);
    const bloom = useAppSelector(TaksonomiBloomInstance);
    const user = getSessionApp<UserPtk>()?.name;
    const {currentData, setCurrentData} = useFormEdura<BankSoalAppType>();
    const {state} = useCrudBankSoalProvider();
    const {actions:actionsModal, state:stateModal, nextState} = useModal<InitialItemSoalImplemented>()


    /** pengaturan kelas dan kurikulumnya */
    const [selectedAtpId, setSelectedAtpId] = useState<string>(currentData?.snapshot_kurikulum?.atp_as_tp_id?.toString() ?? '')
    const [kelas, setKelas] = useState<number>(currentData.jenjang_khusus);
    /** pengaturan soal yang membutuhkan opsi jawaban */
    const [opsiJawab, setOpsiJawab] = useState<JsonAlatJawabTupple|undefined>(currentData.json_alat_jawab);
    const [jawabanOpsi, setJawabanOpsi] = useState<string[]>([])
    
    /** PG Tunggal */
    const [opsiPgTunggal, setOpsiTunggal] = useState<OpsiPilihanJawabanType[]>(currentData.json_alat_jawab?.OpsiPilihanJawaban ?? []);
    const [countOpsiPgTunggal, setCountOpsiPgTunggal] = useState<number>(4);
    const kunciPgPertama = currentData?.json_alat_jawab?.valid && currentData?.json_alat_jawab?.valid.filter((s, i)=> i === 0);
    const [kunciPgTunggal, setKunciPgTunggal] = useState<number[]>([0] );
    const [formatOpsiPgTunggal, setFormatOpsiPgTunggal] = useState<FormatElemen>('vertical');

    const [opsiPgKompleks, setOpsiPgKompleks] = useState<OpsiPilihanJawabanType[]>(currentData.json_alat_jawab?.OpsiPilihanJawaban ?? []);
    const [countOpsiPgKompleks, setCountOpsiPgKompleks] = useState<number>(4);
    const [kunciPgKompleks, setKunciPgKompleks] = useState<number[]>((currentData.json_alat_jawab?.valid as number[]) ?? [0]);
    const [formatOpsiPgKompleks, setFormatOpsiPgKompleks] = useState<FormatElemen>('vertical');


    /** tiptapEditor setter */
    const [valueJsonStimulus, setValueJsonStimulus] = useState<JSONContent|null>(currentData.stimulus as unknown as JSONContent)
    const [valueJsonPertanyaan, setValueJsonPertanyaan] = useState<JSONContent|null>(currentData.pertanyaan as unknown as JSONContent)
    const [valueJsonPembahasan, setValueJsonPembahasan] = useState<JSONContent|null>(currentData.pembahasan_penskoran as unknown as JSONContent)
    const htmlStimulus = useMemo(()=>HtmlRenderer({document:valueJsonStimulus}),[valueJsonStimulus])
    const htmlPertanyaan = useMemo(()=>HtmlRenderer({document:valueJsonPertanyaan}),[valueJsonPertanyaan])
    const htmlPembahasan = useMemo(()=>HtmlRenderer({document:valueJsonPembahasan}),[valueJsonPembahasan])
    
    const koleksiJenjang = useMemo(()=>{
        
        if([1, 2].includes(currentData.jenjang_khusus)){
            return [ 1, 2]
        }else if([3, 4].includes(currentData.jenjang_khusus)){
            return [3, 4]
        }else{
            return [5, 6]
        }
    },[]);

    const defineNameBentukSoal = useMemo(()=>ListBentukSoal.find(s=>s.name === currentData.bentuk_soal),[currentData.bentuk_soal]);
    const memoTaksonomi = useMemo(()=>{
        const taksonomi = new TaksonomiMatcher(bloom.data);
        const match = taksonomi.find(currentData.indikator_soal);
        return match;
    },[currentData.indikator_soal]);

    /** isi setter saat pertama load */
    useEffect(()=>{
        setValueJsonPertanyaan(currentData.pertanyaan as unknown as JSONContent)
        setValueJsonStimulus(currentData.stimulus as unknown as JSONContent);
        setValueJsonPembahasan(currentData.pembahasan_penskoran as unknown as JSONContent);
        /** mode baru */
        setCurrentData(draft=>{
            draft.auto_koreksi = ListBentukSoal.find(s=>s.name === draft.bentuk_soal)?.way_correction!
            draft.oleh = user ??'';
        })

        if(currentData.bentuk_soal === 'pg' && currentData.json_alat_jawab){
            if(currentData.json_alat_jawab.valid.length >1){
                setKunciPgTunggal([currentData.json_alat_jawab.valid[0]] as number[]);
            }else{
                setKunciPgTunggal(currentData.json_alat_jawab.valid as number[])
            }
        }
        if(currentData.bentuk_soal === 'pg_kompleks' && currentData.json_alat_jawab){
            setKunciPgKompleks(currentData.json_alat_jawab?.valid as number[])
        }
    },[]);

    /** efect dari mengubah bentuk soal */
    useEffect(()=>{
        if(currentData.bentuk_soal === 'pg' && currentData.json_alat_jawab){
            setOpsiJawab({
                valid:kunciPgTunggal,
                formatOpsi:formatOpsiPgTunggal,
                OpsiPilihanJawaban:opsiPgTunggal
            })
            setJawabanOpsi(kunciPgTunggal.map(m=>String.fromCharCode(65+m)))
            setOpsiTunggal(prev=>{
                if(prev.length === 0){
                    return Array.from({ length: 4 }, (_, index) => ({
                                    content: "",
                                    index,
                                }))
                }
                return prev;
            });
            setKunciPgTunggal(prev=> prev.length === 0 ? [0] : prev)
        }
        if(currentData.bentuk_soal === 'pg_kompleks' && currentData.json_alat_jawab){
            
            setOpsiJawab({
                valid:kunciPgKompleks,
                formatOpsi:formatOpsiPgKompleks,
                OpsiPilihanJawaban:opsiPgKompleks
            })
            setJawabanOpsi(kunciPgKompleks.map(m=>'opsi '+(m+1)))
            setOpsiPgKompleks(prev=>{
                if(prev.length === 0){
                    return Array.from({ length: 4 }, (_, index) => ({
                                    content: "",
                                    index,
                                }))
                }
                return prev
            });
            setKunciPgKompleks(prev=> prev.length === 0 ? [0] : prev)   
        }
    },[currentData.bentuk_soal, setOpsiTunggal, setKunciPgTunggal, setOpsiPgKompleks]);

    const promes = useMemo(()=>{
    //     const kurikulumHasSelected = value.extra?.setting?.kurikulum ?? []
    //     return Prota?.data.filter(s=>s.kodemapel === currentData.kode_mapel && s.kelas.includes(kelas));
    // }, [kelas, Prota]);
        if(!value.extra?.setting?.kurikulum) return [];
        return value.extra.setting.kurikulum;//?.filter(s=>s.kodemapel === currentData.kode_mapel)
    },[value.extra?.setting?.kurikulum])
    
    const handleSelectjenjang = useCallback((v:string)=>{
        setKelas(Number(v));
        setCurrentData(draft=>{
            
            draft.jenjang_khusus = Number(v);
        })
    },[])
    
    const handleSelectKurikulum = useCallback((v:string )=>{
            if(!v) return;
            setSelectedAtpId(v);
            
    },[])

    const handleSelectBentukSoal = useCallback((v:string)=>{
        setCurrentData(draft=>{
            draft.bentuk_soal = v
            draft.auto_koreksi = ListBentukSoal.find(s=>s.name)?.way_correction!
        });
    },[ ]);
    

    const handleChangKunciPgTunggal = useCallback((v:number)=>{
        setKunciPgTunggal([v]);
        // setJawabanOpsi([String.fromCharCode(65 + v)])
    },[])
    const handleChangKunciPgKompleks = useCallback((v:number[])=>{
        setKunciPgKompleks(v);
        // setJawabanOpsi([String.fromCharCode(65 + v)])
    },[])

    useEffect(()=>{
        
        const number = Number(selectedAtpId)
        const found = promes?.find(s=>s.atp_as_tp_id === number);
        setCurrentData(draft=>{
            draft.snapshot_kurikulum = found;
            draft.indikator_soal = found ? `Siswa dapat ${found?.atp_as_tp_description}`:'';
            draft.kd_id = found?.atp_as_tp_id ?? 0;
            draft.kd_deskripsi = found?.atp_as_tp_description ?? '';
            draft.ruang_lingkup = found?.lingkup_materi ?? '';
            draft.fase_jenjang = found?.kelas ?? []
        })
        
    },[selectedAtpId, promes]);
    
    useEffect(()=>{
        
        setCurrentData(draft=>{
            draft.taksonomi = memoTaksonomi
            draft.lk = memoTaksonomi?.LK ?? 'LK1'
        })
    }, [memoTaksonomi])
    
    useEffect(()=>{
        const opsi = opsiPgTunggal.length === 0 
                ? Array.from({length:4}, (_, index)=>({index, content:''}))
                : opsiPgTunggal;
        const kunci = kunciPgTunggal.length === 0 ? [0] : kunciPgTunggal
        setJawabanOpsi([String.fromCharCode(65 + kunci[0])])
        setOpsiJawab({
            formatOpsi:formatOpsiPgTunggal ?? 'vertical',
            valid:kunciPgTunggal,
            OpsiPilihanJawaban:opsi//opsiPgTunggal
        })
        
    }, [opsiPgTunggal, kunciPgTunggal, setOpsiJawab]);
    
    useEffect(()=>{
        setJawabanOpsi(kunciPgKompleks.map(m=>'opsi '+(m+1)))
        setOpsiJawab({
            formatOpsi:formatOpsiPgTunggal ?? 'vertical',
            valid:kunciPgKompleks,
            OpsiPilihanJawaban:opsiPgKompleks

        })
        
    }, [opsiPgKompleks, kunciPgKompleks, setOpsiJawab])
    
    /** saat bentuk soal diubah, opsiPG akan mempengaruhi json_alat_jawan */
    useEffect(()=>{
        setCurrentData(draft=>{
            draft.json_alat_jawab = opsiJawab;
            draft.jawaban = jawabanOpsi;
        })
    },[opsiJawab, jawabanOpsi])
    
    useEffect(()=>{
        if(typeof valueJsonStimulus === 'string') return;
        setCurrentData(draft=>{
            draft.stimulus = htmlStimulus
        })
    }, [htmlStimulus, valueJsonStimulus, setCurrentData])
    
    useEffect(()=>{
        if(typeof valueJsonPertanyaan === 'string') return;
        setCurrentData(draft=>{
            draft.pertanyaan = htmlPertanyaan
        })
    }, [htmlPertanyaan, setCurrentData, valueJsonPertanyaan])
    
    useEffect(()=>{
        
        if(typeof valueJsonPembahasan === 'string') return;
        setCurrentData(draft=>{
            draft.pembahasan_penskoran = htmlPembahasan
        })
    }, [htmlPembahasan, setCurrentData, valueJsonPembahasan])
    
    
    return (
        <FieldSet disabled={state.isSubmitting}>
            <Tabs defaultValue="tabSoal" className="gap-0" >
                <TabsList className="flex-nowrap scroll-x-auto  justify-start w-screen md:w-fit ps-4 min-[412px]:ps-0 overflow-x-auto scrol-h-custom pb-1 md:pb-0">
                    <TabsTrigger value="tabSoal">Soal</TabsTrigger>
                    {
                        (['pg', 'pg_kompleks', 'menjodohkan'].includes(currentData.bentuk_soal) &&currentData.json_alat_jawab) && <TabsTrigger value="tabOpsiJawaban">Opsi Jawaban</TabsTrigger>
                    }
                    <TabsTrigger value="pembahasan">Pembahasan</TabsTrigger>
                    <TabsTrigger value="indikator_soal">Indikator Soal</TabsTrigger>
                    <TabsTrigger value="kurikulum">Kurikulum</TabsTrigger>
                    <TabsTrigger value="level">Level Soal</TabsTrigger>
                    <TabsTrigger value="result">Pratinjau</TabsTrigger>
                    {/* <TabsTrigger value="json">JSON</TabsTrigger> */}
                </TabsList>
                <div className="bg-linear-to-br md:px-2 from-sky-300 to-sky-200 md:h-[calc(100vh-12rem)] dark:from-sky-700 dark:to-sky-600  md:w-fulloverflow-y-scroll scrol-h-custom">
                    <TabsContent className="flex flex-col gap-0 text-sm md:w-auto" value="tabSoal">
                        <ContentTabSoalPaket currentData={currentData} 
                                valueJsonStimulus={valueJsonStimulus} 
                                actionStimulus={setValueJsonStimulus}
                                valueJsonPertanyaan={valueJsonPertanyaan} 
                                actionPertanyaan={setValueJsonPertanyaan}
                                kelas={kelas}
                                handleSelectjenjang={handleSelectjenjang}
                                koleksiJenjang={koleksiJenjang}
                                bentukSoal = {currentData.bentuk_soal}
                                handleChangeBentukSoal={handleSelectBentukSoal}
                                />
                    </TabsContent>
                    {
                        currentData.json_alat_jawab && (
                            <TabsContent className="flex flex-col gap-0 text-sm md:w-auto" value="tabOpsiJawaban">
                                <ContentTabOpsiJawab 
                                    currentData={currentData} 
                                    defineNameBentukSoal={defineNameBentukSoal!}
                                    opsiPgTunggal={opsiPgTunggal} 
                                    setOpsiTunggal={setOpsiTunggal}
                                    kunciPgTunggal={kunciPgTunggal??[0]}
                                    handleChangKunciPgTunggal={handleChangKunciPgTunggal}
                                    
                                    opsiPgKompleks={opsiPgKompleks} 
                                    setOpsiPgKompleks={setOpsiPgKompleks}
                                    kunciPgKompleks={kunciPgKompleks}
                                    handleChangKunciPgKompleks={handleChangKunciPgKompleks}
                                    />
                            </TabsContent>
                        )
                    }
                    <TabsContent value="pembahasan">
                        <ContentTabPembahasan 
                            currentData={currentData}
                            defineNameBentukSoal={defineNameBentukSoal!} 
                            valueJsonPembahasan={valueJsonPembahasan} 
                            actionPembahasan={setValueJsonPembahasan}
                            />
                    </TabsContent>
                    <TabsContent value="indikator_soal">
                        <ContentTabIndikatorSoal defineNameBentukSoal={defineNameBentukSoal!} />
                    </TabsContent>
                    <TabsContent value="kurikulum">
                        <ContentTabKurikulum
                            currentData={currentData}
                            defineNameBentukSoal={defineNameBentukSoal!}
                            handleSelectKurikulum={handleSelectKurikulum}
                            selectedAtpId={selectedAtpId}
                            promes={promes ?? []}
                            />
                        
                    </TabsContent>
                    <TabsContent value="level">
                        <ContentTabLevelSoal
                            currentData={currentData}
                            defineNameBentukSoal={defineNameBentukSoal!}
                            promes={promes ?? []}
                            />
                        
                    </TabsContent>
                    <TabsContent value="result">
                        <ContentTabPratinjauSoalModal currentData={currentData}/>
                        
                    </TabsContent>
                    <TabsContent value="json">
                        <div className="overflow-x-auto max-w-5xl scrol-h-custom">
                            <pre>
                                {
                                    Object.entries(currentData).map(([k,v], i)=>
                                        <div key={i}>
                                            {k} = { Array.isArray(v)? v.map((ar, ii)=>
                                                    <div className="inline" key={ii}>
                                                        {JSON.stringify(ar)}
                                                    </div>
                                                ): <div className="inline-block">{JSON.stringify(v)}</div>
                                            }
                                        </div>
                                    )
                                }
                            </pre>
                        </div>
                    </TabsContent>

                </div>
            </Tabs>
            <ModalFooterEdura>
                <div className="w-full flex justify-center gap-x-2">
                    {
                        mode && mode ==='tambah_baru'?
                        (
                            <SendSoalBaruPaket data={currentData}/>
                        ):(
                            <>
                                
                                <SendEditSoalPaket data={currentData}/>
                            </>
                        )
                    }
                    
                </div>
            </ModalFooterEdura>
        </FieldSet>
    )
}